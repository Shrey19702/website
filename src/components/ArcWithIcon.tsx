// ArcWithIcon.tsx
"use client";

import React, { useRef, useEffect, useState }  from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, QuadraticBezierCurve3, Object3D, Camera } from "three";
// Removed: import ThreeGlobe from "three-globe"; // Not needed directly
import { Mail, FileText, Image, AlertTriangle, PlayCircle } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    email: Mail,
    document: FileText,
    media: Image,
    malicious: AlertTriangle,
    default: PlayCircle,
};

interface ArcData {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
    type: string;
}

interface ArcWithIconProps {
    arcData: ArcData;
    globeRef: React.RefObject<any>; // ThreeGlobe instance
    arcDashAnimateTime: number;   // ms, total time for one dash+gap cycle
    arcDashLength: number;        // 0-1, geometric length of the dash
    arcDashInitialGap: number;    // 0-1, geometric length of initial gap before animation starts for this arc
    arcDashGap: number;           // 0-1, geometric length of the gap after the dash
    globeRadius?: number;         // Default globe radius is 100
}

export function ArcWithIcon({
    arcData,
    globeRef,
    arcDashAnimateTime,
    arcDashLength,
    arcDashInitialGap,
    arcDashGap,
    globeRadius = 100,
}: ArcWithIconProps) {
    const [localPosition, setLocalPosition] = useState<Vector3 | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const curveRef = useRef<QuadraticBezierCurve3 | null>(null);
    const IconComponent = iconMap[arcData.type] || iconMap.default;

    useEffect(() => {
        if (!globeRef.current || !globeRef.current.getCoords) {
             // Globe not ready yet
            return;
        }

        const startVec = globeRef.current.getCoords(arcData.startLat, arcData.startLng, 0);
        const endVec = globeRef.current.getCoords(arcData.endLat, arcData.endLng, 0);
        
        const midPoint = new Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const alt = globeRadius * (1 + arcData.arcAlt); // Altitude adjustment for control point
        const controlPoint = midPoint.normalize().multiplyScalar(alt);
        
        curveRef.current = new QuadraticBezierCurve3(startVec, controlPoint, endVec);
        
        // Reset visibility when arc data changes
        setIsVisible(false);

    }, [arcData, globeRef, globeRadius]); // globeRef.current is not a dep, but its availability is key

    useFrame(({ clock, camera }) => {
        if (!curveRef.current || !globeRef.current) {
            if (isVisible) setIsVisible(false);
            return;
        }

        const rawElapsedTimeMs = clock.elapsedTime * 1000;

        // Total pattern length in geometric units (dash + gap)
        const totalPatternGeometricLength = arcDashLength + arcDashGap;
        if (totalPatternGeometricLength <= 0 || arcDashAnimateTime <= 0) {
            if (isVisible) setIsVisible(false);
            return; // Invalid parameters, hide icon
        }

        // Calculate initial time delay for this arc based on its geometric initial gap
        // This is the time equivalent of traversing the arcDashInitialGap length
        const initialTimeDelayMs = (arcDashInitialGap / totalPatternGeometricLength) * arcDashAnimateTime;

        const effectiveElapsedTimeMs = rawElapsedTimeMs - initialTimeDelayMs;

        if (effectiveElapsedTimeMs < 0) {
            if (isVisible) setIsVisible(false); // Not yet time for this arc's animation cycle to start
            return;
        }

        // Current time into this arc's specific animation cycle (which repeats every arcDashAnimateTime)
        const timeIntoCycleMs = effectiveElapsedTimeMs % arcDashAnimateTime;

        // Duration of the visible dash part of the cycle
        // This is proportional to its geometric length relative to the total pattern length
        const dashDurationMs = (arcDashLength / totalPatternGeometricLength) * arcDashAnimateTime;

        if (dashDurationMs > 0 && timeIntoCycleMs >= 0 && timeIntoCycleMs < dashDurationMs) {
            // We are in the visible dash phase
            const t = timeIntoCycleMs / dashDurationMs; // Normalized progress (0-1) along the arc for the icon
            
            const pointOnCurve = curveRef.current.getPointAt(t);
            setLocalPosition(pointOnCurve);

            // Camera visibility check
            const cameraPosition = camera.position;
            const toCamera = new Vector3().subVectors(cameraPosition, pointOnCurve).normalize();
            // Assuming globe is centered at origin. If globeRef.current.position is something else, adjust.
            const globeCenter = globeRef.current.position ? globeRef.current.position.clone() : new Vector3(0,0,0);
            const toCenterOfGlobe = pointOnCurve.clone().sub(globeCenter).negate().normalize(); 
            const dotProduct = toCamera.dot(toCenterOfGlobe);
            
            // Point is visible if it's on the hemisphere facing the camera
            // dotProduct < 0 means angle > 90 degrees. Adjust threshold as needed (e.g. 0.1 for slight wrap-around)
            const isPointGloballyVisible = dotProduct < 0.15; 

            if (isPointGloballyVisible) {
                if (!isVisible) setIsVisible(true);
            } else {
                if (isVisible) setIsVisible(false);
            }
        } else {
            // We are in the gap phase, or dash has no duration
            if (isVisible) setIsVisible(false);
        }
    });

    if (!isVisible || !localPosition) return null;

    return (
        <Html position={localPosition} center>
            <div
                style={{
                    background: "rgba(255,255,255,0.7)", 
                    
                    color: arcData.color === "#ff0000" 
                        ? "rgba(255,0,0,0.85)" 
                        : "rgba(0,0,255,0.85)",
                    // color: "white",
                    padding: "3px 4px",
                    borderRadius: "100px", // Make it circular for a single icon
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                    // border: arcData.color === "#ff0000" 
                    //     ? "1px solid rgba(255,100,100,0.9)" 
                    //     : "1px solid rgba(100,100,255,0.9)",
                    pointerEvents: "none", // Important for interaction with globe
                    // Opacity and transform handled by visibility state now
                }}
            >
                {React.createElement(IconComponent, { size: 20 })} {/* Slightly smaller icon */}
            </div>
        </Html>
    );
}