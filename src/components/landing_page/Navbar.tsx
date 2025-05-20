import { motion } from "framer-motion"

import DemoButton from "../demo_button"

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
                <DemoButton onClick={() => window.open("https://cal.com/ami-contrails/", "_blank")} />
            </div>
        </motion.nav>
    )
}

export default Navbar;