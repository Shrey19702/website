
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
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        1
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                        </svg>
                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Content Ingestion</h3>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 2 Text */}
                            <motion.div
                                className="absolute inset-0"
                                style={{ opacity: section2Opacity, y: section2Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        2
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                                        </svg>

                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Multi-layer Analysis</h3>
                                    </div>

                                </div>
                            </motion.div>

                            {/* Section 3 Text */}
                            <motion.div
                                className="absolute inset-0"
                                style={{ opacity: section3Opacity, y: section3Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        3
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>

                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Threat Detection</h3>
                                    </div>

                                </div>
                            </motion.div>

                            {/* Section 4 Text */}
                            <motion.div
                                className="absolute inset-0"
                                style={{ opacity: section4Opacity, y: section4Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#0253E4] text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        4
                                    </div>

                                    <div className="flex items-end gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                        </svg>

                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Actionable Insights</h3>
                                    </div>

                                </div>
                            </motion.div>
                        </div>

                        {/* Right side - Changing Visuals (Opacity matches text) */}
                        {/* This also needs to be a container for absolute positioned visuals */}
                        <div className="relative h-full hidden md:block"> {/* Hide on small screens if too cluttered, or adjust layout */}
                            {/* 1 */}
                            <motion.div className="absolute inset-0" style={{ opacity: section1Opacity }}> {/* No Y transform, just fade */}
                                <div className="relative rounded-3xl overflow-hidden p-5 py-8 shadow shadow-primary aspect-[16/10]">
                                    <p className=" py-4 font-outfit text-base">
                                        Our system processes videos, audio, images, and text from any source or format. The advanced
                                        ingestion pipeline handles multiple file types and can extract content from various platforms
                                        including social media, news sites, and direct uploads.
                                    </p>
                                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-lg ">
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
                            {/* 2 */}
                            <motion.div className="absolute inset-0" style={{ opacity: section2Opacity }}>
                                <div className="relative rounded-3xl overflow-hidden p-5 py-8 shadow shadow-primary aspect-[16/10]">
                                    <p className=" py-4 font-outfit text-base">
                                        Advanced AI models examine content for manipulation, factual accuracy, and harmful elements. Our
                                        proprietary algorithms analyze visual, audio, and textual components simultaneously to provide
                                        comprehensive assessment.
                                    </p>
                                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-lg ">
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
                            {/* 3 */}
                            <motion.div className="absolute inset-0" style={{ opacity: section3Opacity }}>
                                <div className="relative rounded-3xl overflow-hidden p-5 py-8 shadow shadow-primary aspect-[16/10]">
                                    <p className=" py-4 font-outfit text-base">
                                        Precise identification of deepfakes, misinformation, and policy violations. Our system categorizes
                                        threats and assigns confidence scores to help prioritize response actions.
                                    </p>
                                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-lg ">
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
                            {/* 4 */}
                            <motion.div className="absolute inset-0" style={{ opacity: section4Opacity }}>
                                <div className="relative rounded-3xl overflow-hidden p-5 py-8 shadow shadow-primary aspect-[16/10]">
                                    <p className=" py-4 font-outfit text-base">
                                        Detailed reports with confidence scores and recommended actions. Our dashboard provides
                                        comprehensive analytics and visualization tools to help understand patterns and make informed
                                        decisions.
                                    </p>
                                    <ul className="mt-3 md:mt-4 space-y-1 md:space-y-2 text-lg ">
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