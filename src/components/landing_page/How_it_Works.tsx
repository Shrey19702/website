
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, AlertTriangle, Eye, Linkedin } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import Multimodal_checks from "../animated_media/multimodal_checks"
import Instant_results from "../animated_media/instant_results"
import Explainability_n_locallization from "../animated_media/explainability_n_localization"
import Verified_detailed_report from "../animated_media/verified_detailed_report"

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
        <div className="relative font-outfit pt-20" ref={stickyContainerRef}>
            {/* Header */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Is it human-made or AI-crafted? <br /> Our analysis reveals the truth.
                </h2>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                    How it works?
                </p>
            </motion.div>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"> {/* Ensure h-screen or enough height */}
                <div className="container mx-auto px-4 py-16 w-full"> {/* Make container take full width of sticky parent */}

                    {/* Grid for Text and Visuals */}
                    <div className="flex items-center justify-center relative h-[500px] md:h-[450px]"> {/* Added relative and fixed height */}
                        {/* Left side - Animated Text Content */}
                        {/* Make this div a container for absolute positioned text blocks */}
                        {/* <div className="relative h-full"> */}
                        {/* Section 1 Text */}
                        {/* <motion.div
                                className="absolute inset-0" // Each text block is absolute
                                style={{ opacity: section1Opacity, y: section1Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        1
                                    </div>
                                    <div className="flex items-end gap-4">
                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Content Ingestion</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div> */}

                        {/* Section 2 Text */}
                        {/* <motion.div
                                className="absolute inset-0"
                                style={{ opacity: section2Opacity, y: section2Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        2
                                    </div>
                                    <div className="flex items-end gap-4">
                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Multi-layer Analysis</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                                        </svg>

                                    </div>

                                </div>
                            </motion.div> */}

                        {/* Section 3 Text */}
                        {/* <motion.div
                                className="absolute inset-0"
                                style={{ opacity: section3Opacity, y: section3Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        3
                                    </div>
                                    <div className="flex items-end gap-4">
                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Threat Detection</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>

                                    </div>

                                </div>
                            </motion.div> */}

                        {/* Section 4 Text */}
                        {/* <motion.div
                                className="absolute inset-0"
                                style={{ opacity: section4Opacity, y: section4Y }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow shadow-primary">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4 md:mb-6">
                                        4
                                    </div>

                                    <div className="flex items-end gap-4">
                                        <h3 className="text-xl md:text-4xl font-semibold mb-3 md:mb-4 font-outfit">Actionable Insights</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                        </svg>

                                    </div>

                                </div>
                            </motion.div> */}
                        {/* </div> */}

                        {/* Right side - Changing Visuals (Opacity matches text) */}
                        {/* This also needs to be a container for absolute positioned visuals */}
                        <div className="relative font-outfit h-full w-full "> {/* Hide on small screens if too cluttered, or adjust layout */}
                            {/* 1 */}
                            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: section1Opacity }}> {/* No Y transform, just fade */}
                                <div className="relative rounded-3xl overflow-hidden shadow shadow-primary h-[70vh] aspect-[2/1]">
                                    <div className="h-full w-full p-1 flex ">
                                        {/* INFO */}
                                        <div className=" pl-8 pr-4 py-10  flex flex-col-reverse justify-between w-1/2 ">
                                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg ">
                                                1
                                            </div>
                                            <div className="flex flex-col items-center gap-4">
                                                <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4 font-outfit w-full">Conduct Multi-Modal Checks</h3>
                                                <div>
                                                    Upload your content and let our AI conduct multi-modal checks.
                                                </div>
                                            </div>
                                        </div>
                                        {/* content */}
                                        <div className="bg-primary text-white p-10 rounded-3xl w-full  overflow-hidden relative">
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

                                            <div className=" w-full h-full">
                                                <Multimodal_checks />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* 2 */}
                            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: section2Opacity }}>
                                <div className="relative rounded-3xl overflow-hidden shadow shadow-primary h-[70vh] aspect-[2/1]">
                                    <div className="h-full w-full p-1 flex ">
                                        {/* INFO */}
                                        <div className=" pl-8 pr-4 py-10  flex flex-col-reverse justify-between w-1/2 ">
                                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg ">
                                                2
                                            </div>
                                            <div className="flex flex-col items-center gap-4">
                                                <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4 font-outfit w-full">Get Instant Results</h3>
                                                <div>
                                                    Get instant results with detailed graphs, confidence scores, and analysis.
                                                </div>
                                            </div>
                                        </div>
                                        {/* content */}
                                        <div className="bg-primary text-white p-10 rounded-3xl w-full  overflow-hidden relative">
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

                                            <div className=" w-full h-full">
                                                <Instant_results />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* 3 */}
                            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: section3Opacity }}>
                                <div className="relative rounded-3xl overflow-hidden shadow shadow-primary h-[70vh] aspect-[2/1]">
                                    <div className="h-full w-full p-1 flex ">
                                        {/* INFO */}
                                        <div className=" pl-8 pr-4 py-10  flex flex-col-reverse justify-between w-1/2 ">
                                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg ">
                                                3
                                            </div>
                                            <div className="flex flex-col items-center gap-4">
                                                <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4 font-outfit w-full">Deep Explainability & Localization</h3>
                                                <div>
                                                    Deep Learning Models with good results, explanations, and visualizations.
                                                </div>
                                            </div>
                                        </div>
                                        {/* content */}
                                        <div className="bg-primary text-white p-10 rounded-3xl w-full  overflow-hidden relative">
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

                                            <div className=" w-full h-full">
                                                <Explainability_n_locallization />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* 4 */}
                            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: section4Opacity }}>
                                <div className="relative rounded-3xl overflow-hidden shadow shadow-primary h-[70vh] aspect-[2/1]">
                                    
                                    <div className="h-full w-full p-1 flex ">
                                        {/* INFO */}
                                        <div className=" pl-8 pr-4 py-10  flex flex-col-reverse justify-between w-1/2 ">
                                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg ">
                                                4
                                            </div>
                                            <div className="flex flex-col items-center gap-4">
                                                <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4 font-outfit w-full">Verified Detailed Reports</h3>
                                                <div>
                                                    All The major report details with analysis and visualizations.
                                                </div>
                                            </div>
                                        </div>
                                        {/* content */}
                                        <div className="bg-primary text-white p-10 rounded-3xl w-full  overflow-hidden relative">
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

                                            <div className=" w-full h-full">
                                                <Verified_detailed_report />
                                            </div>

                                        </div>
                                    </div>
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