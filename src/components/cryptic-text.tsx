"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CrypticTextProps {
  text: string
  className?: string
  revealDuration?: number
  scrambleSpeed?: number
}

export function CrypticText({ text, className, revealDuration = 2, scrambleSpeed = 50 }: CrypticTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isRevealing, setIsRevealing] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const targetIndex = useRef(0)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/"

  // Start the reveal animation
  const startReveal = () => {
    if (isRevealing) return
    setIsRevealing(true)
    targetIndex.current = 0

    // Calculate interval based on total duration and text length
    const interval = (revealDuration * 1000) / text.length

    intervalRef.current = setInterval(() => {
      if (targetIndex.current <= text.length) {
        // Get the revealed portion of the text
        const revealed = text.substring(0, targetIndex.current)

        // Generate scrambled text for the rest
        let scrambled = ""
        for (let i = 0; i < text.length - targetIndex.current; i++) {
          scrambled += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        // Combine revealed and scrambled parts
        setDisplayText(revealed + scrambled)
        targetIndex.current++
      } else {
        // Fully revealed
        setDisplayText(text)
        setIsRevealing(false)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, interval)
  }

  useEffect(() => {
    // Start the animation after a short delay
    const timeout = setTimeout(() => {
      startReveal()
    }, 300)

    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text])

  return (
    <motion.h1
      className={cn("", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText || text}
    </motion.h1>
  )
}
