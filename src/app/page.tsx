"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Shield, AlertTriangle, Eye, Linkedin } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import anime from "animejs/lib/anime.es.js"
import { CrypticText } from "@/components/cryptic-text"
import { SimpleGlobe } from "@/components/simple-globe"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: false })
  const [scrollY, setScrollY] = useState(0)

  // For the flowing line animation
  const lineRef = useRef<HTMLDivElement>(null)

  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ["start start", "end end"], // Keep this as is for now
  })

  // New approach for section transitions
  // Each section will get a total of 0.25 of scrollYProgress
  // We'll use a small portion of that (e.g., 0.05) for the transition itself.
  const transitionPoint = 0.05; // How much of the 0.25 progress is used for fade/slide

  // Section 1
  const section1Opacity = useTransform(
    scrollYProgress,
    [0, 0.25 - transitionPoint, 0.25], // Appears, stays, fades out
    [1, 1, 0]
  )
  const section1Y = useTransform(
    scrollYProgress,
    [0, 0.25 - transitionPoint, 0.25],
    [0, 0, -50] // Stays, then moves up on fade
  )

  // Section 2
  const section2Opacity = useTransform(
    scrollYProgress,
    // Starts fading in as section 1 fades out, fully visible, then fades out
    [0.25 - transitionPoint, 0.25, 0.5 - transitionPoint, 0.5],
    [0, 1, 1, 0]
  )
  const section2Y = useTransform(
    scrollYProgress,
    [0.25 - transitionPoint, 0.25, 0.5 - transitionPoint, 0.5],
    [50, 0, 0, -50] // Moves in from bottom, stays, then moves up on fade
  )

  // Section 3
  const section3Opacity = useTransform(
    scrollYProgress,
    [0.5 - transitionPoint, 0.5, 0.75 - transitionPoint, 0.75],
    [0, 1, 1, 0]
  )
  const section3Y = useTransform(
    scrollYProgress,
    [0.5 - transitionPoint, 0.5, 0.75 - transitionPoint, 0.75],
    [50, 0, 0, -50]
  )

  // Section 4
  const section4Opacity = useTransform(
    scrollYProgress,
    [0.75 - transitionPoint, 0.75, 1 - transitionPoint, 1],
    [0, 1, 1, 0] // For the last section, it can just fade out or stay
  )
  const section4Y = useTransform(
    scrollYProgress,
    [0.75 - transitionPoint, 0.75, 1 - transitionPoint, 1],
    [50, 0, 0, 0] // Moves in from bottom and stays
  )


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 flowing-lines" ref={lineRef}>
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

      {/* Navigation */}
      <motion.nav
        className="container mx-auto py-6 px-4 flex justify-between items-center relative z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className=" h-8 w-8 relative">
              <Image alt="logo" src={"/logo.svg"} fill />
            </div>
            {/* <Shield className="h-8 w-8 text-[#0253E4]" /> */}
          </motion.div>
          <motion.span
            className="font-outfit text-xl font-semibold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contrails AI
          </motion.span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-sm text-black hover:text-[#0253E4] transition-colors font-outfit relative group"
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0253E4] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#"
            className="text-sm text-black hover:text-[#0253E4] transition-colors font-outfit relative group"
          >
            Terms & Conditions
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0253E4] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Button className="bg-[#0253E4] hover:bg-[#0253E4]/90 text-white rounded-full px-6 relative overflow-hidden group">
            <span className="relative z-10">Book a Demo</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative" ref={heroRef}>
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-[#0253E4]/5 floating-circle"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full bg-[#0253E4]/10 floating-circle"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-[#0253E4]/15 floating-circle"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <CrypticText
              text="Safeguarding Digital Truth in an AI World"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-outfit leading-tight"
              revealDuration={1.5}
            />
            <motion.p
              className="text-lg mb-8 text-gray-700 font-outfit max-w-xl"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Contrails AI provides cutting-edge solutions to detect manipulated media, misinformation, and harmful
              content across digital platforms.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <Button className="bg-[#0253E4] hover:bg-[#0253E4]/90 text-white rounded-full px-8 py-6 text-lg relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Book a Demo
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative "
          >
            <SimpleGlobe />

            {/* Floating security indicators */}
            <motion.div
              className="absolute top-10 right-10 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-[#0253E4]/20 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-outfit">Deepfake detected</span>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-[#0253E4]/20 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.3 }}
            >
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-outfit">Misinformation alert</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Curved Divider */}
      <div className="relative h-24 overflow-hidden">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#0253E4]/5"
          ></path>
        </svg>
      </div>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16 bg-[#0253E4]/5 mb-20 relative overflow-hidden">
        {/* Hide flowing lines in this section */}
        <style jsx global>{`
          .services-section .flowing-lines {
            opacity: 0;
          }
        `}</style>

        <div className="text-center mb-16 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 font-outfit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Trust & Safety Solutions
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto font-outfit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive tools to detect and mitigate harmful content across all digital platforms
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {[
            {
              icon: <Eye className="h-10 w-10 text-[#0253E4]" />,
              title: "Deepfake Detection",
              description: "Identify AI-manipulated video and audio content with industry-leading accuracy",
              gif: "/features/face_scan.gif?height=200&width=300",
            },
            {
              icon: <AlertTriangle className="h-10 w-10 text-[#0253E4]" />,
              title: "Misinformation Analysis",
              description: "Detect false claims and misleading content across social media platforms",
              gif: "/placeholder.svg?height=200&width=300",
            },
            {
              icon: <Shield className="h-10 w-10 text-[#0253E4]" />,
              title: "Harmful Content Filtering",
              description: "Identify and flag hate speech, illegal advertisements, and harmful content",
              gif: "/features/audio_waveform.gif?height=200&width=300",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="card-hover bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-[#0253E4]/10 hover:border-[#0253E4]/30 transition-all hover:shadow-md relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-5 p-3 bg-[#0253E4]/10 inline-block rounded-xl group-hover:bg-[#0253E4]/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 font-outfit">{service.title}</h3>
              <p className="text-gray-600 font-outfit mb-4">{service.description}</p>
              <div className="  bg-white rounded-3xl overflow-hidden mt-4 transition-shadow relative flex items-center justify-center z-10 ">
                <img src={service.gif || "/placeholder.svg"} alt={service.title} className=" w-96 h-96 scale-[105%] p-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* How It Works Section - Improved Sticky Scroll */}
      <div className="relative" ref={stickyContainerRef}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"> {/* Ensure h-screen or enough height */}
          <div className="container mx-auto px-4 py-16 w-full"> {/* Make container take full width of sticky parent */}
            <div className="text-center mb-12 md:mb-16"> {/* Increased bottom margin */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 font-outfit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                How Contrails AI Works
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 max-w-2xl mx-auto font-outfit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our advanced AI models analyze content across multiple dimensions to ensure digital safety
              </motion.p>
            </div>

            {/* Grid for Text and Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative h-[500px] md:h-[450px]"> {/* Added relative and fixed height */}
              {/* Left side - Animated Text Content */}
              {/* Make this div a container for absolute positioned text blocks */}
              <div className="relative h-full">
                {/* Section 1 Text */}
                <motion.div
                  className="absolute inset-0" // Each text block is absolute
                  style={{ opacity: section1Opacity, y: section1Y }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-[#0253E4]/10">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                      1
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-outfit">Content Ingestion</h3>
                    <p className="text-gray-600 font-outfit text-sm md:text-base">
                      Our system processes videos, audio, images, and text from any source or format. The advanced
                      ingestion pipeline handles multiple file types and can extract content from various platforms
                      including social media, news sites, and direct uploads.
                    </p>
                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-sm md:text-base">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Support for all media formats</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Real-time streaming capabilities</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Batch processing for large datasets</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 2 Text */}
                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: section2Opacity, y: section2Y }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-[#0253E4]/10">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                      2
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-outfit">Multi-layer Analysis</h3>
                    <p className="text-gray-600 font-outfit text-sm md:text-base">
                      Advanced AI models examine content for manipulation, factual accuracy, and harmful elements. Our
                      proprietary algorithms analyze visual, audio, and textual components simultaneously to provide
                      comprehensive assessment.
                    </p>
                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-sm md:text-base">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Visual manipulation detection</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Audio synthesis identification</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Cross-reference fact checking</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 3 Text */}
                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: section3Opacity, y: section3Y }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-[#0253E4]/10">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                      3
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-outfit">Threat Detection</h3>
                    <p className="text-gray-600 font-outfit text-sm md:text-base">
                      Precise identification of deepfakes, misinformation, and policy violations. Our system categorizes
                      threats and assigns confidence scores to help prioritize response actions.
                    </p>
                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-sm md:text-base">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Deepfake detection with 99.7% accuracy</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Misinformation classification</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Harmful content identification</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 4 Text */}
                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: section4Opacity, y: section4Y }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-[#0253E4]/10">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                      4
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 font-outfit">Actionable Insights</h3>
                    <p className="text-gray-600 font-outfit text-sm md:text-base">
                      Detailed reports with confidence scores and recommended actions. Our dashboard provides
                      comprehensive analytics and visualization tools to help understand patterns and make informed
                      decisions.
                    </p>
                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-sm md:text-base">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Detailed threat assessment reports</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Recommended response actions</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#0253E4]" />
                        <span>Integration with content moderation systems</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Changing Visuals (Opacity matches text) */}
              {/* This also needs to be a container for absolute positioned visuals */}
              <div className="relative h-full hidden md:block"> {/* Hide on small screens if too cluttered, or adjust layout */}
                <motion.div className="absolute inset-0" style={{ opacity: section1Opacity }}> {/* No Y transform, just fade */}
                  <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#0253E4]/20 aspect-[16/10]">
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Ingestion+Visual"
                      alt="Content Ingestion"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 md:p-6">
                      <span className="text-white font-outfit font-semibold text-lg md:text-xl">Content Ingestion</span>
                      <span className="text-white/80 font-outfit text-xs md:text-sm">Processing multiple content formats</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-[#0253E4]/10">
                    <p className="text-gray-700 font-outfit text-xs md:text-sm">
                      Our advanced content ingestion pipeline handles over 50 different file formats and can process up
                      to 10,000 media items per minute.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="absolute inset-0" style={{ opacity: section2Opacity }}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#0253E4]/20 aspect-[16/10]">
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Analysis+Visual"
                      alt="Multi-layer Analysis"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 md:p-6">
                      <span className="text-white font-outfit font-semibold text-lg md:text-xl">Multi-layer Analysis</span>
                      <span className="text-white/80 font-outfit text-xs md:text-sm">AI models examining content</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-[#0253E4]/10">
                    <p className="text-gray-700 font-outfit text-xs md:text-sm">
                      Proprietary neural networks analyze 200+ signals across visual, audio, and text for comprehensive manipulation detection.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="absolute inset-0" style={{ opacity: section3Opacity }}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#0253E4]/20 aspect-[16/10]">
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Threat+Visual"
                      alt="Threat Detection"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 md:p-6">
                      <span className="text-white font-outfit font-semibold text-lg md:text-xl">Threat Detection</span>
                      <span className="text-white/80 font-outfit text-xs md:text-sm">
                        Identifying deepfakes and misinformation
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-[#0253E4]/10">
                    <p className="text-gray-700 font-outfit text-xs md:text-sm">
                      Categorizes content into 15 risk types with confidence scores to prioritize moderation effectively.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="absolute inset-0" style={{ opacity: section4Opacity }}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#0253E4]/20 aspect-[16/10]">
                    <img
                      src="/placeholder.svg?height=300&width=500&text=Insights+Visual"
                      alt="Actionable Insights"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 md:p-6">
                      <span className="text-white font-outfit font-semibold text-lg md:text-xl">Actionable Insights</span>
                      <span className="text-white/80 font-outfit text-xs md:text-sm">Detailed reports and recommendations</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-6 bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-[#0253E4]/10">
                    <p className="text-gray-700 font-outfit text-xs md:text-sm">
                      Dashboard offers real-time analytics, trend analysis, and automated response suggestions for existing workflows.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* This div controls the height of the sticky section */}
        {/* Adjust height based on how many sections and how long you want each to be "active" */}
        {/* 4 sections * 100vh per section = 400vh, plus some for entry/exit = ~450vh or 500vh */}
        <div style={{ height: "450vh" }} className="bg-transparent" />
      </div>

      {/* Trusted By Section */}
      <section className="container mx-auto px-4 py-20 bg-[#0253E4]/5 rounded-3xl relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0253E4]/10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#0253E4]/10 translate-y-1/2 -translate-x-1/2"></div>

        <div className="text-center mb-16 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 font-outfit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Trusted By Industry Leaders
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto font-outfit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Partnering with top news organizations and content platforms worldwide
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { name: "BOOM", image: "boom.png" },
            { name: "DeepfakeAnalysisUnit", image: "dau.png" },
            { name: "The Quint", image: "quint.png" },
            { name: "vishwas news", image: "vishwas.png" }
          ].map((partner, index) => (
            <motion.div
              key={index}
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(2, 83, 228, 0.1), 0 8px 10px -6px rgba(2, 83, 228, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="card-hover h-40 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-[#0253E4]/10 flex items-center justify-center group hover:border-[#0253E4]/40 transition-all"
            >
              <Image className="" width={300} height={300} alt="" src={`/customers/${partner.image}`} />
              {/* <span className="text-xl font-semibold text-gray-800 font-outfit group-hover:text-[#0253E4] transition-colors">
                {partner.name}
              </span> */}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 text-[#0253E4] font-outfit font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CheckCircle className="h-5 w-5" />
            <span>Trusted by international news organizations and content platforms</span>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          className="bg-gradient-to-r from-[#0253E4] to-[#0253E4]/80 rounded-3xl p-12 text-white text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="opacity-20">
              <defs>
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white/10 translate-x-1/3 translate-y-1/3"></div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 font-outfit relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Safeguard Your Digital Content?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto font-outfit relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book a demo today and discover how Contrails AI can protect your platform from harmful content and
            misinformation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="bg-white text-[#0253E4] hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium relative z-10 group">
              <span className="relative z-10 flex items-center">
                Book a Demo
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-[#0253E4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className=" h-8 w-8 relative">
              <Image alt="logo" src={"/logo.svg"} fill />
            </div>
            {/* <Shield className="h-6 w-6 text-[#0253E4]" /> */}
            <span className="font-outfit text-lg font-semibold">Contrails AI</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#0253E4] transition-colors font-outfit relative group"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0253E4] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-[#0253E4] transition-colors font-outfit relative group"
            >
              Terms & Conditions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0253E4] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <Link href="#" className="transition-colors h-5 w-5 text-gray-600 hover:text-[#0253E4]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 32 32"
                  className="h-5 w-5 fill-current" // <--- Add fill-current here
                >
                  <path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#0253E4] transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 font-outfit">
            © {new Date().getFullYear()} Contrails AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
