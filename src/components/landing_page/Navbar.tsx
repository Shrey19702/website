import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

import { ArrowRight } from "lucide-react"

import Image from "next/image"

const Navbar = () => {
    // Navigation
    return (

        <motion.nav
            className="container mx-auto py-6 px-4 flex justify-between items-center relative z-50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-2">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className=" h-8 w-8 relative">
                        <Image alt="logo" src={"/logo.svg"} fill />
                    </div>
                </motion.div>
                <motion.span
                    className="font-outfit text-2xl font-bold text-primary"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Contrails AI
                </motion.span>
            </div>
            <div className="flex items-center gap-6">
                <Button className="bg-[#0253E4] hover:bg-[#0253E4]/90 text-white rounded-full px-6 py-4 text-lg relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">
                        Book a Demo
                        <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.span>
                    </span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
            </div>
        </motion.nav>
    )
}

export default Navbar;