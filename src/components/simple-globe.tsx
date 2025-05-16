"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Point {
  x: number
  y: number
  z: number
  size: number
  color: string
  originalX: number
  originalY: number
  originalZ: number
  pulsing: boolean
  pulseSpeed: number
}

interface Connection {
  pointA: number
  pointB: number
  opacity: number
}

export function SimpleGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize variables first
    let radius = Math.min(canvas.width, canvas.height) / 4
    let originX = canvas.width / 2
    let originY = canvas.height / 2
    let rotationX = 0
    let rotationY = 0
    let rotationSpeed = -0.005
    let time = 0

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!containerRef.current || !ctx) return
      
      const containerWidth = 600
      const containerHeight = 600
      const dpr = window.devicePixelRatio || 1

      // Set canvas size accounting for DPR
      canvas.width = containerWidth * dpr
      canvas.height = containerHeight * dpr

      // Set display size
      canvas.style.width = `${containerWidth}px`
      canvas.style.height = `${containerHeight}px`

      // Scale context for DPR
      ctx.scale(dpr, dpr)

      // Update parameters after resize
      radius = Math.min(containerWidth, containerHeight) / 3
      originX = containerWidth / 2
      originY = containerHeight / 2
    }

    // Initial setup
    setCanvasDimensions()

    // Create points on the globe
    const points: Point[] = []
    const numPoints = 200

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      points.push({
        x,
        y,
        z,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.8 ? "#0253E4" : "rgba(2, 83, 228, 0.5)",
        originalX: x,
        originalY: y,
        originalZ: z,
        pulsing: Math.random() > 0.7,
        pulseSpeed: 0.5 + Math.random() * 2,
      })
    }

    // Add connections between points
    const connections: Connection[] = []
    const maxConnections = 100
    const maxDistance = radius * 0.5

    for (let i = 0; i < maxConnections; i++) {
      const pointA = Math.floor(Math.random() * points.length)
      const pointB = Math.floor(Math.random() * points.length)

      if (pointA !== pointB) {
        const dx = points[pointA].x - points[pointB].x
        const dy = points[pointA].y - points[pointB].y
        const dz = points[pointA].z - points[pointB].z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < maxDistance) {
          connections.push({
            pointA,
            pointB,
            opacity: Math.random() * 0.5 + 0.1,
          })
        }
      }
    }

    // Animation function
    const animate = () => {
      time += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update rotation
      rotationY += rotationSpeed
      rotationX = Math.sin(time * 0.2) * 0.2

      // Sort points by z-coordinate for proper rendering
      const sortedPoints = [...points].sort((a, b) => {
        const aZ = a.z * Math.cos(rotationY) - a.x * Math.sin(rotationY)
        const bZ = b.z * Math.cos(rotationY) - b.x * Math.sin(rotationY)
        return aZ - bZ
      })

      // Draw connections
      ctx.lineWidth = 0.5
      connections.forEach((conn) => {
        const pointA = points[conn.pointA]
        const pointB = points[conn.pointB]

        const ax = pointA.x * Math.cos(rotationY) + pointA.z * Math.sin(rotationY)
        const az = pointA.z * Math.cos(rotationY) - pointA.x * Math.sin(rotationY)
        const ay = pointA.y * Math.cos(rotationX) + az * Math.sin(rotationX)

        const bx = pointB.x * Math.cos(rotationY) + pointB.z * Math.sin(rotationY)
        const bz = pointB.z * Math.cos(rotationY) - pointB.x * Math.sin(rotationY)
        const by = pointB.y * Math.cos(rotationX) + bz * Math.sin(rotationX)

        if (az > -radius / 2 && bz > -radius / 2) {
          ctx.beginPath()
          ctx.moveTo(originX + ax, originY + ay)
          ctx.lineTo(originX + bx, originY + by)

          const avgZ = (az + bz) / 2
          const normalizedZ = (avgZ + radius) / (2 * radius)
          const opacity = normalizedZ * conn.opacity

          ctx.strokeStyle = `rgba(2, 83, 228, ${opacity})`
          ctx.stroke()
        }
      })

      // Draw points
      sortedPoints.forEach((point) => {
        const x = point.x * Math.cos(rotationY) + point.z * Math.sin(rotationY)
        const z = point.z * Math.cos(rotationY) - point.x * Math.sin(rotationY)
        const y = point.y * Math.cos(rotationX) + z * Math.sin(rotationX)

        if (z > -radius / 2) {
          const normalizedZ = (z + radius) / (2 * radius)
          const size = point.size * normalizedZ

          let finalSize = size
          if (point.pulsing) {
            finalSize = size * (1 + 0.3 * Math.sin(time * point.pulseSpeed))
          }

          ctx.beginPath()
          ctx.arc(originX + x, originY + y, finalSize, 0, Math.PI * 2)

          const opacity = 0.3 + normalizedZ * 0.7
          ctx.fillStyle = point.color.includes("rgba") 
            ? point.color.replace("0.5", opacity.toString()) 
            : point.color

          ctx.fill()
        }
      })

      // Draw grid lines
      ctx.strokeStyle = "rgba(2, 83, 228, 0.2)"
      ctx.lineWidth = 0.5

      // Equator
      ctx.beginPath()
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)

        const rotatedX = x * Math.cos(rotationY) + z * Math.sin(rotationY)

        if (i === 0) {
          ctx.moveTo(originX + rotatedX, originY)
        } else {
          ctx.lineTo(originX + rotatedX, originY)
        }
      }
      ctx.stroke()

      // Meridian
      ctx.beginPath()
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2
        const y = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)

        // const rotatedZ = z * Math.cos(rotationY)
        const rotatedX = z * Math.sin(rotationY)

        if (i === 0) {
          ctx.moveTo(originX + rotatedX, originY + y)
        } else {
          ctx.lineTo(originX + rotatedX, originY + y)
        }
      }
      ctx.stroke()

      // Second Meridian (90 degrees rotated)
      ctx.beginPath()
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)

        const rotatedX = x * Math.cos(rotationY)

        if (i === 0) {
          ctx.moveTo(originX + rotatedX, originY + y)
        } else {
          ctx.lineTo(originX + rotatedX, originY + y)
        }
      }
      ctx.stroke()

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Add interactive rotation on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      rotationSpeed = (mouseX - originX) * 0.00002
    }

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", setCanvasDimensions)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className=" flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-[500px] h-[500px]"></canvas>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#0253E4]/70 blur-3xl"></div>
      </div>
    </motion.div>
  )
}
