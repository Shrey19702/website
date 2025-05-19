import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Shield, AlertTriangle, Eye, Linkedin } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const CTA_Section = ()=>{
    return (
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
    )
}

export default CTA_Section;