"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileAudio,
  FileImage,
  FileVideo,
  FileText,
  LucideProps,
} from "lucide-react";

// Icon mapping
const fileIcons: { [key: string]: React.FC<LucideProps> } = {
  audio: FileAudio,
  image: FileImage,
  video: FileVideo,
  default: FileText,
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    type: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  const duplicatedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    return [...items, ...items];
  }, [items]);

  useEffect(() => {
    if (containerRef.current && duplicatedItems.length > 0) {
      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [direction, speed, duplicatedItems.length]); // eslint-disable-line react-hooks/exhaustive-deps
  // Added eslint-disable-line for getDirection and getSpeed if they are stable

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let duration = "40s";
      if (speed === "fast") duration = "20s";
      else if (speed === "slow") duration = "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller group relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedItems.map((item, idx) => {
          const IconComponent =
            fileIcons[item.type.toLowerCase()] || fileIcons.default;

          return (
            <motion.li
              className="relative w-20 h-24 shrink-0 rounded-xl border border-primary/40 dark:border-primary/20 bg-gradient-to-b from-white to-blue-100 dark:from-slate-800 dark:to-sky-900/50 flex flex-col items-center justify-center overflow-hidden cursor-pointer p-4"
              key={`card-${item.name}-${idx}`}
              initial="rest"
              whileHover="hovered"
              variants={{
                rest: { scale: 1, zIndex: 1 },
                hovered: { scale: 1.05, zIndex: 10 },
              }}
              transition={{ duration: 0.3, ease: "circOut" }}
              // Define CSS variable for glow color here if it needs to be dynamic per card
              // style={{ "--glow-color": item.glowColor || "#0253e466" } as React.CSSProperties}
            >
              {/* Animated background glow on hover */}
              <motion.div
                className="absolute inset-0 z-0 opacity-0"
                variants={{
                  rest: { opacity: 0, scale: 0.8 },
                  hovered: {
                    opacity: 1,
                    // For pulsation: define scale as an array of keyframes
                    // It will animate from rest.scale (0.8) to hovered.scale[0] (1)
                    // then it will cycle through [1, 1.08, 1] repeatedly.
                    scale: [1, 1.08, 1],
                    background:
                      "radial-gradient(circle at 50% 50%, var(--glow-color, #0253e466) 0%, transparent 70%)",
                  },
                }}
                transition={{
                  // Transition for opacity (when variant changes from rest to hovered)
                  opacity: { duration: 0.4, ease: "easeInOut" },
                  // Transition for scale (applies to initial scale-up AND pulsation)
                  scale: {
                    duration: 1.1, // Duration of one full pulse cycle (e.g., 1 -> 1.08 -> 1)
                    repeat: Infinity,
                    repeatType: "mirror", // "mirror" makes it go back and forth smoothly
                    ease: "easeInOut",
                  },
                }}
                style={{ pointerEvents: "none" }}
              />

              {/* Content container (Icon + Name) */}
              <motion.div className="z-10 relative flex flex-col items-center justify-center h-full w-full text-center">
                <motion.div
                  variants={{
                    rest: { scale: 1, y: 0 },
                    hovered: { scale: 1, y: -1},
                  }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className=" blur-[2px] text-primary/50 relative  " // Removed group-hover as it's handled by variants
                >
                  <IconComponent size={84} strokeWidth={1.5} />
                </motion.div>

                <motion.h3
                  className=" absolute text-3xl font-bold leading-tight text-slate-800"
                  variants={{
                    rest: { scale: 1, y: 0, opacity: 0.8 },
                    hovered: { scale: 1.01, y: -2, opacity: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  {item.name}
                </motion.h3>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};