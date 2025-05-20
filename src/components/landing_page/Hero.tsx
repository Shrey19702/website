"use client"

import { useRef } from "react"
import { CheckCircle, AlertTriangle, } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { ContentGlobe } from "@/components/content-globe"
import DemoButton from "../demo_button"
const Hero_Page = () => {

    const heroRef = useRef < HTMLDivElement > (null)
    const isHeroInView = useInView(heroRef, { once: false })

    return (
        <section className="container mx-auto px-4 pb-20 relative" ref={heroRef}>
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
                    <div className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 font-outfit leading-tight" >
                        Reimagining AI for online
                    </div>
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-outfit leading-tight text-primary" >
                        Content Safety
                    </div>
                    {/* <CrypticText
                      text="Safeguarding Digital Truth in an AI World"
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-outfit leading-tight"
                      revealDuration={1.5}
                    /> */}
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
                        <DemoButton onClick={()=>{console.log("yo")}} />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isHeroInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative"
                >
                    <ContentGlobe />
                    {/* <GlobeAnimation /> */}

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
    )
}

export default Hero_Page;