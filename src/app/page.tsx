"use client"

import { useRef, useEffect } from "react"
import anime from "animejs/lib/anime.es.js"

import Navbar from "@/components/landing_page/Navbar"
import Hero_Page from "@/components/landing_page/Hero"
import Services_Section from "@/components/landing_page/Services"
import How_It_Works from "@/components/landing_page/How_it_Works"
import Trusted_By from "@/components/landing_page/Trusted_by"
import CTA_Section from "@/components/landing_page/CTA"
import Footer from "@/components/landing_page/Footer"
import { FeaturesSectionDemo } from "@/components/landing_page/features"

export default function Home() {

  // For the flowing line animation
  const lineRef = useRef<HTMLDivElement>(null)

  // ANIMATE MOVING LINES AND CIRCLES
  useEffect(() => {
    if (lineRef.current) {
      anime({
        targets: ".flowing-line path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 3000,
        delay: (el, i) => i * 250,
        direction: "alternate",
        loop: true,
      })
    }

    // Initialize floating circles animation
    anime({
      targets: ".floating-circle",
      translateY: () => anime.random(-15, 15),
      translateX: () => anime.random(-15, 15),
      scale: () => 0.9 + anime.random(0, 0.3),
      easing: "easeInOutQuad",
      duration: () => anime.random(800, 1600),
      delay: () => anime.random(0, 400),
      direction: "alternate",
      loop: true,
    })
  }, [])

  // CARDs HOVER FOLLOW EFFECT
  useEffect(() => {
    // Card hover effect setup
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.card-hover')

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Flowing line that spans the entire page */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 flowing-lines" ref={lineRef}>
        <svg className="flowing-line w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 C20,20 40,80 60,40 S80,60 100,50" fill="none" stroke="#0253E4" strokeWidth="0.2" />
          <path
            d="M0,30 C30,10 50,90 70,30 S90,40 100,30"
            fill="none"
            stroke="#0253E4"
            strokeWidth="0.2"
            strokeDasharray="5,5"
          />
          <path d="M0,70 C10,50 30,20 50,70 S80,20 100,70" fill="none" stroke="#0253E4" strokeWidth="0.2" />
        </svg>
      </div>

      <Navbar />

      {/* Hero Section */}
      <Hero_Page />

      {/* Curved Divider */}
      <div className=" h-12">
        <div className=" h-56 relative -top-44   ">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-[#f3f5fe]"
            ></path>
          </svg>
        </div>
      </div>

      {/* Services Section */}
      <Services_Section />

      <FeaturesSectionDemo />

      {/* How It Works Section - Sticky Scroll */}
      <How_It_Works />

      {/* Trusted By Section */}
      <Trusted_By />

      {/* CTA Section */}
      <CTA_Section />


      {/* Footer */}
      <Footer />

    </div>
  )
}
