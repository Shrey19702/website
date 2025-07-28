import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Multimodal_checks from "../animated_media/multimodal_checks"
import Instant_results from "../animated_media/instant_results"
import Explainability_n_locallization from "../animated_media/explainability_n_localization"
import Verified_detailed_report from "../animated_media/verified_detailed_report"

const How_It_Works = () => {
    const stickyContainerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: stickyContainerRef,
        offset: ["start start", "end end"],
    })

    const transitionPoint = 0.05

    // Section animations
    const section1Opacity = useTransform(scrollYProgress, [0, 0.25 - transitionPoint, 0.25], [1, 1, 0])
    const section2Opacity = useTransform(scrollYProgress, [0.25 - transitionPoint, 0.25, 0.5 - transitionPoint, 0.5], [0, 1, 1, 0])
    const section3Opacity = useTransform(scrollYProgress, [0.5 - transitionPoint, 0.5, 0.75 - transitionPoint, 0.75], [0, 1, 1, 0])
    const section4Opacity = useTransform(scrollYProgress, [0.75 - transitionPoint, 0.75, 1], [0, 1, 1])

    const sections = [
        {
            id: 1,
            title: "Conduct Multi-Modal Checks",
            description: "Upload your content and let our AI conduct multi-modal checks.",
            opacity: section1Opacity,
            component: <Multimodal_checks />
        },
        {
            id: 2,
            title: "Get Instant Results",
            description: "Get instant results with detailed graphs, confidence scores, and analysis.",
            opacity: section2Opacity,
            component: <Instant_results />
        },
        {
            id: 3,
            title: "Deep Explainability & Localization",
            description: "Deep Learning Models with good results, explanations, and visualizations.",
            opacity: section3Opacity,
            component: <Explainability_n_locallization />
        },
        {
            id: 4,
            title: "Verified Detailed Reports",
            description: "All The major report details with analysis and visualizations.",
            opacity: section4Opacity,
            component: <Verified_detailed_report />
        }
    ]

    return (
        <div className="relative font-outfit pt-20" ref={stickyContainerRef}>
            {/* Header */}
            <motion.div
                className="text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Is it human-made or AI-crafted? <br /> Our analysis reveals the truth.
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                    How it works?
                </p>
            </motion.div>

            {/* Sticky Content */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="container mx-auto px-4 py-8 md:py-16 w-full">
                    <div className="flex items-center justify-center relative h-[80vh] md:h-[70vh]">
                        <div className="relative w-full h-full max-w-6xl">
                            {sections.map((section) => (
                                <motion.div 
                                    key={section.id}
                                    className="absolute inset-0 flex items-center justify-center" 
                                    style={{ opacity: section.opacity }}
                                >
                                    <div className="w-full h-full">
                                        {/* Mobile Layout (flex-col) */}
                                        <div className="flex flex-col md:hidden relative border border-primary -top-20 h-[85%] bg-white rounded-3xl shadow-lg shadow-primary/40 overflow-hidden">
                                            {/* Mobile Info Section */}
                                            <div className="p-6 flex items-center justify-between bg-gray-50">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                                                        {section.id}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold font-outfit">{section.title}</h3>
                                                        <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Mobile Visual Section */}
                                            <div className=" flex-1 bg-primary text-white relative overflow-hidden">
                                                {/* Background Pattern */}
                                                <div className="absolute inset-0 pointer-events-none opacity-10">
                                                    <svg width="100%" height="100%">
                                                        <defs>
                                                            <pattern id={`dots-${section.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                                                <circle cx="3" cy="3" r="1.5" fill="white" />
                                                            </pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" fill={`url(#dots-${section.id})`} />
                                                    </svg>
                                                </div>
                                                
                                                <div className="p-4 w-full h-full">
                                                    {section.component}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Layout (flex-row) */}
                                        <div className="hidden md:flex p-2 border border-primary h-full bg-white rounded-3xl shadow-lg shadow-primary/40 overflow-hidden">
                                            {/* Desktop Info Section */}
                                            <div className="w-1/3 p-8 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-2xl lg:text-3xl font-semibold mb-4 font-outfit leading-tight">
                                                        {section.title}
                                                    </h3>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {section.description}
                                                    </p>
                                                </div>
                                                
                                                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                                                    {section.id}
                                                </div>
                                            </div>
                                            
                                            {/* Desktop Visual Section */}
                                            <div className="flex-1 bg-primary text-white relative overflow-hidden rounded-2xl">
                                                {/* Background Pattern */}
                                                <div className="absolute inset-0 pointer-events-none opacity-20">
                                                    <svg width="100%" height="100%">
                                                        <defs>
                                                            <pattern id={`dots-desktop-${section.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                                                <circle cx="3" cy="3" r="1.5" fill="white" />
                                                            </pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" fill={`url(#dots-desktop-${section.id})`} />
                                                    </svg>
                                                </div>
                                                
                                                <div className="p-8 lg:p-10 w-full h-full">
                                                    {section.component}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll height controller */}
            <div style={{ height: "400vh" }} className="bg-transparent" />
        </div>
    )
}

export default How_It_Works