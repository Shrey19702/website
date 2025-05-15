"use client"

import { motion } from "framer-motion"
import type { MotionStyle } from "framer-motion"

interface StickySectionItemProps {
  title: string
  description: string
  index: number
  style?: MotionStyle
}

export function StickySectionItem({ title, description, index, style }: StickySectionItemProps) {
  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={style}>
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
          {index}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-3 font-outfit">{title}</h3>
          <p className="text-gray-600 font-outfit max-w-md">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
