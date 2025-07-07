import { motion } from "framer-motion"
import DemoButton from "../demo_button"

const CTA_Section = () => {
  return (
    <section className="container mx-auto px-4  ">
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
          className="flex justify-center"
        >
          <DemoButton onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} variant="secondary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CTA_Section;