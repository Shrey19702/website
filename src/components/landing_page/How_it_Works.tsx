
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, AlertTriangle, Eye, Linkedin } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const How_It_Works = () => {

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
    

    return (
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
    )
}

export default How_It_Works;