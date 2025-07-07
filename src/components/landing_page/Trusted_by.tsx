import Image from "next/image"
import { ArrowRight, CheckCircle, Shield, AlertTriangle, Eye, Linkedin } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { div } from "framer-motion/client"

const Trusted_By = () => {
    return (
        <div className="  rounded-3xl">

            <section className="container mx-auto px-4 py-20  rounded-3xl relative overflow-hidden">
                {/* Background decorative elements */}
                {/* <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0253E4]/10 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#0253E4]/10 translate-y-1/2 -translate-x-1/2"></div> */}

                {/* <div className="text-center mb-16 relative z-10">
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
                </div> */}

                
                <div className=" pb-10 text-center text-xl relative z-10">
                    <motion.div
                        className="inline-flex items-center gap-2 text-primary font-outfit font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <CheckCircle className="h-5 w-5" />
                        <span>Trusted by international news organizations and content platforms</span>
                    </motion.div>
                </div>

                <motion.div
                    className="flex flex-wrap gap-8 items-center justify-center mx-auto relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {[
                        { name: "The Quint", image: "quint.png" },
                        { name: "DeepfakeAnalysisUnit", image: "dau.png" },
                        { name: "BOOM", image: "boom.png" },
                    ].map((partner, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                boxShadow: "0 10px 25px -5px rgba(2, 83, 228, 0.1), 0 8px 10px -6px rgba(2, 83, 228, 0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="card-hover h-40 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border flex items-center justify-center group border-primary/40 transition-all"
                        >
                            <Image className=" grayscale " width={300} height={300} alt="" src={`/customers/${partner.image}`} />

                        </motion.div>
                    ))}
                </motion.div>

            </section>

        </div>
    )
}

export default Trusted_By;