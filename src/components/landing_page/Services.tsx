import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, AlertTriangle, Shield } from 'lucide-react';
import Deepfake_Detection_Media from '../animated_media/deepfake_detection';
import MisinformationGuard from '../animated_media/misinformation_guard';
import ContentFilter from '../animated_media/content_filter'

interface Service {
    icon: React.ReactElement;
    title: string;
    subtitle: string;
    description: string;
    gif?: string;
    color: string;
    media_component?: React.ReactElement;
}

const TrustSafetySection: React.FC = () => {
    const [activeCard, setActiveCard] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const progressRef = useRef<NodeJS.Timeout | null>(null);

    const services: Service[] = [
        {
            icon: <Eye className="h-6 w-6" />,
            title: "Deepfake Detection",
            subtitle: "AI-POWERED ANALYSIS",
            description: "Our advanced deeplearning models analyze expressions, patterns, and pixel-level inconsistencies to identify AI-manipulations in content.",
            media_component: <Deepfake_Detection_Media />,
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <AlertTriangle className="h-6 w-6" />,
            title: "Misinformation Guard",
            subtitle: "REAL-TIME VERIFICATION",
            description: "Instantly detect suspicious narrative patterns. Our system stops false information before it spreads.",
            gif: "/features/analyze.svg",
            color: "from-amber-500 to-orange-500",
            media_component: <MisinformationGuard />,
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Smart Content Filter",
            subtitle: "AUTOMATED PROTECTION",
            description: "Models trained on millions of examples identify harmful content with contextual understanding.",
            gif: "/features/audio_waveform.gif",
            color: "from-emerald-500 to-green-500",
            media_component: <ContentFilter />
        }
    ];

    const CYCLE_DURATION = 12000; // 12 seconds per card
    const PROGRESS_UPDATE = 50; // Update every 50ms

    // Start auto-cycle and progress tracking
    useEffect(() => {
        startCycle();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (progressRef.current) {
                clearInterval(progressRef.current);
            }
        };
    }, []);

    const startCycle = (): void => {
        // Clear existing intervals
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (progressRef.current) {
            clearInterval(progressRef.current);
        }

        // Reset progress
        setProgress(0);

        // Auto-advance cards
        intervalRef.current = setInterval(() => {
            setActiveCard(prev => (prev + 1) % services.length);
            setProgress(0);
        }, CYCLE_DURATION);

        // Update progress
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (100 / (CYCLE_DURATION / PROGRESS_UPDATE));
                return newProgress >= 100 ? 0 : newProgress;
            });
        }, PROGRESS_UPDATE);
    };

    const selectCard = (index: number): void => {
        if (index === activeCard) return;

        setActiveCard(index);
        setProgress(0);
        startCycle(); // Reset the cycle
    };

    return (
        <section className="px-6 lg:px-20 py-0 lg:py-24 bg-gradient-to-b from-primary/5 via-primary/10 via-60% to-white font-outfit relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        AI Safety at Enterprise Scale
                    </h2>
                    <p className=" text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        Deploy comprehensive AI-powered protection across all your digital platforms.
                        Detect threats in real-time, prevent harmful content, and maintain trust at scale.
                    </p>
                </motion.div>

                {/* Navigation Cards */}
                <motion.div
                    className="flex gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {services.map((service, index) => (
                        <motion.button
                            key={index}
                            onClick={() => selectCard(index)}
                            className={`relative flex-1 p-6 text-left rounded-2xl transition-all overflow-hidden group ${activeCard === index
                                    ? ' bg-white shadow'
                                    : ' bg-slate-50 shadow-sm hover:bg-white'
                                }`}
                            whileHover={{ y: activeCard !== index ? -2 : 0 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Progress bar */}
                            {activeCard === index && (
                                <div className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-primary/5 to-primary/20 transition-all duration-75 ease-linear"
                                    style={{ width: `${progress}%` }} />
                            )}

                            <div className="flex flex-col md:flex-row items-center gap-4 z-10 relative">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold break-words text-slate-900 text-center text-sm md:text-lg mb-1">
                                        {service.title}
                                    </h3>
                                    {/* <p className="text-sm text-slate-500 font-medium">
                                        {service.subtitle}
                                    </p> */}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl mb-10 border overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col md:flex-row w-full gap-0 md:min-h-[600px]"
                        >
                            {/* Content Side */}
                            <div className=" w-full flex flex-col justify-center p-4 lg:py-16 lg:pl-12 max-w-[90vw] md:max-w-fit">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <div className="mb-8 mt-2">
                                        {/* <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${services[activeCard].color} text-white text-sm font-semibold mb-6`}>
                                            {services[activeCard].icon}
                                            {services[activeCard].subtitle}
                                        </div> */}
                                        <h3 className="text-3xl text-center md:text-4xl font-semibold text-slate-900  leading-tight">
                                            {services[activeCard].title}
                                        </h3>
                                    </div>

                                    <p className="text-slate-600 text-center leading-relaxed text-lg md:text-xl text-pretty lg:max-w-96 ">
                                        {services[activeCard].description}
                                    </p>

                                </motion.div>
                            </div>

                            {/* Visual Side - Clean GIF Display */}
                            <div className=" py-10 px-5 flex items-center justify-center ">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="w-full h-full relative"
                                >
                                    {services[activeCard].media_component ?
                                        services[activeCard].media_component :
                                        <img
                                            src={services[activeCard].gif}
                                            alt={services[activeCard].title}
                                            className="w-full h-auto object-contain"
                                            style={{ maxHeight: '400px' }}
                                        />
                                    }
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default TrustSafetySection;