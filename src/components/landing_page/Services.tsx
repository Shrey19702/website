import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, AlertTriangle, Eye, Linkedin } from "lucide-react"

const Services_Section = () => {
    return (
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
    )
}

export default Services_Section;