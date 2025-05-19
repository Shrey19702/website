"use client";

import { useRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, QuadraticBezierCurve3 } from "three";
import ThreeGlobe from "three-globe";
import { Mail, FileText, Image, AlertTriangle, PlayCircle } from "lucide-react";

// Icon mapping
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
    globeRef: React.RefObject<ThreeGlobe | null>;
    animationTime: number; // Corresponds to arcTime
    globeRadius?: number; // Default globe radius is 100
}

const ARC_ORDER_DELAY_FACTOR = 200; // ms delay per order unit

export function ArcWithIcon({
    arcData,
    globeRef,
    animationTime,
    globeRadius = 100, // three-globe's default radius
}: ArcWithIconProps) {
    const [localPosition, setLocalPosition] = useState<Vector3 | null>(null);
    const [curve, setCurve] = useState<QuadraticBezierCurve3 | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const startTimeRef = useRef<number>(0);
    const IconComponent = iconMap[arcData.type] || iconMap.default;

    useEffect(() => {
        if (!globeRef.current) return;

        const { startLat, startLng, endLat, endLng, arcAlt } = arcData;

        // Convert lat/lng to 3D coordinates
        const startVec = new Vector3().copy(globeRef.current.getCoords(startLat, startLng, 0));
        const endVec = new Vector3().copy(globeRef.current.getCoords(endLat, endLng, 0));

        // Calculate control point for the quadratic Bezier curve
        const midPoint = new Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
        const distance = startVec.distanceTo(endVec);

        // Control point calculation
        const altitude = globeRadius * (1 + arcAlt * 0.5) + distance * arcAlt * 0.2;
        const controlPoint = midPoint.clone().normalize().multiplyScalar(altitude);

        const newCurve = new QuadraticBezierCurve3(startVec, controlPoint, endVec);
        setCurve(newCurve);

        const delay = arcData.order * ARC_ORDER_DELAY_FACTOR;
        const timer = setTimeout(() => {
            setIsVisible(true);
            startTimeRef.current = performance.now();
        }, delay);

        return () => clearTimeout(timer);
    }, [arcData, globeRef, globeRadius]);

    useFrame(({ clock }) => {
        if (!curve || !isVisible) {
            if (localPosition !== null) setLocalPosition(null);
            return;
        }

        const elapsedTime = performance.now() - startTimeRef.current;
        let t = (elapsedTime % animationTime) / animationTime;
        t = Math.min(t, 1); // Uncomment for single pass
        // if (t < 0) t = 0;

        // Only show icon when the arc is in the middle of its animation
        const showIcon = t > 0.1 && t < 0.9;

        if (showIcon) {
            const pointOnCurve = curve.getPointAt(t);
            setLocalPosition(pointOnCurve);
        } else {
            setLocalPosition(null);
        }

        // If you want the icon to disappear after reaching the end (for non-looping)
        if (t >= 1 && localPosition !== null) {
            setLocalPosition(null);
            setIsVisible(false); // Optionally reset for a potential re-trigger
        }
    });

    if (!localPosition || !isVisible) return null;

    return (
        <Html position={localPosition} center>
            <div
                style={{
                    background: arcData.color === "#ff0000" ? "rgba(255,0,0,0.7)" : "rgba(0,0,255,0.7)",
                    color: "white",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px", // Adjust size as needed
                    pointerEvents: "none", // Important for OrbitControls
                    transition: "opacity 0.2s ease-in-out",
                    opacity: localPosition ? 1 : 0,
                }}
            >
                <IconComponent size={16} />
            </div>
        </Html>
    );
}