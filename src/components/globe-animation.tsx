"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

interface DataPoint {
  mesh: THREE.Mesh
  initialPos: {
    x: number
    y: number
    z: number
  }
  pulseSpeed: number
}

interface Location {
  lat: number
  lng: number
}

export function GlobeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(400, 400)
    renderer.setClearColor(0x000000, 0)

    containerRef.current.appendChild(renderer.domElement)

    // Create globe with Earth texture
    const geometry = new THREE.SphereGeometry(1, 64, 64)
    
    // Load Earth textures
    const textureLoader = new THREE.TextureLoader()
    // const earthTexture = textureLoader.load('/earth_texture.jpg')
    const specularMap = textureLoader.load('/image.png')

    // Create Earth material
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: specularMap,
    //   specularMap: specularMap,
    //   specular: new THREE.Color(0x333333),
      shininess: 1
    })

    const globe = new THREE.Mesh(geometry, earthMaterial)
    scene.add(globe)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    // Add directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    // Add data points (small spheres) on the globe
    const dataPoints: DataPoint[] = []
    const dataPointGeometry = new THREE.SphereGeometry(0.02, 16, 16)
    const dataPointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

    // Define some major cities/points of interest
    const locations: Location[] = [
      { lat: 40.7128, lng: -74.0060 }, // New York
      { lat: 51.5074, lng: -0.1278 },  // London
      { lat: 35.6762, lng: 139.6503 }, // Tokyo
      { lat: 31.2304, lng: 121.4737 }, // Shanghai
      { lat: 19.0760, lng: 72.8777 },  // Mumbai
      { lat: 28.6139, lng: 77.2090 },  // New Delhi
      { lat: 55.7558, lng: 37.6173 },  // Moscow
      { lat: 48.8566, lng: 2.3522 },   // Paris
      { lat: 37.7749, lng: -122.4194 }, // San Francisco
      { lat: 1.3521, lng: 103.8198 },  // Singapore
      { lat: 33.8688, lng: 151.2093 }, // Sydney
      { lat: 22.3193, lng: 114.1694 }, // Hong Kong
      { lat: 37.5665, lng: 126.9780 }, // Seoul
      { lat: 41.9028, lng: 12.4964 },  // Rome
      { lat: 52.5200, lng: 13.4050 },  // Berlin
      { lat: 59.3293, lng: 18.0686 },  // Stockholm
      { lat: 40.4168, lng: -3.7038 },  // Madrid
      { lat: 45.4642, lng: 9.1900 },   // Milan
      { lat: 59.9139, lng: 10.7522 },  // Oslo
      { lat: 60.1699, lng: 24.9384 }   // Helsinki
    ]

    locations.forEach((location) => {
      const phi = (90 - location.lat) * (Math.PI / 180)
      const theta = (location.lng + 180) * (Math.PI / 180)

      const x = -(Math.sin(phi) * Math.cos(theta))
      const y = Math.cos(phi)
      const z = Math.sin(phi) * Math.sin(theta)

      const dataPoint = new THREE.Mesh(dataPointGeometry, dataPointMaterial)
      dataPoint.position.set(x, y, z)
      dataPoint.scale.set(1, 1, 1)
      globe.add(dataPoint)
      dataPoints.push({
        mesh: dataPoint,
        initialPos: { x, y, z },
        pulseSpeed: 0.5 + Math.random() * 2,
      })
    })

    // Animation
    const animate = () => {
      const time = performance.now() * 0.001

      // Rotate globe
      globe.rotation.y = time * 0.2
    //   globe.rotation.x = time * 0.05

    //   // Animate data points
    //   dataPoints.forEach((point, i) => {
    //     const pulse = Math.sin(time * point.pulseSpeed) * 0.5 + 1.2
    //     point.mesh.scale.set(pulse, pulse, pulse)

    //     // Make data points hover slightly
    //     const hoverOffset = Math.sin(time * point.pulseSpeed + i) * 0.02
    //     point.mesh.position.x = point.initialPos.x * (1 + hoverOffset)
    //     point.mesh.position.y = point.initialPos.y * (1 + hoverOffset)
    //     point.mesh.position.z = point.initialPos.z * (1 + hoverOffset)
    //   })

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      geometry.dispose()
      earthMaterial.dispose()
      dataPointGeometry.dispose()
      dataPointMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[400px] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
