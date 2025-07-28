import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { WavyBackground } from "../wavy-background"

const Footer = () => {
    const footerLinks = [
        { href: "/", label: "Privacy Policy" },
        { href: "/", label: "Terms & Conditions" }
    ]

    const socialLinks = [
        {
            href: "https://twitter.com/contrails_ai",
            label: "Twitter/X",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="h-5 w-5 fill-current"
                >
                    <path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z" />
                </svg>
            )
        },
        {
            href: "https://www.linkedin.com/company/contrails-ai",
            label: "LinkedIn", 
            icon: <Linkedin className="h-5 w-5" />
        }
    ]

    return (
        <footer className="relative">
            {/* Wavy Background */}
            <div className="absolute inset-0 z-0">
                <WavyBackground 
                    className=" z-0"
                    colors={["#0253E4", "#0253E4", "#ffffff", "#ffffff"]}
                    backgroundFill="transparent"
                    blur={10}
                />
            </div>

            {/* Footer Content */}
            <div className="relative z-10 w-full px-4 md:px-10 py-12 md:py-20 bg-gradient-to-t from-primary via-white/40 to-white backdrop-blur-xl min-h-56">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                        
                        {/* Logo Section */}
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 relative flex-shrink-0">
                                <Image 
                                    alt="Contrails AI logo" 
                                    src="/logo.svg" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-outfit text-xl md:text-2xl text-primary font-bold">
                                Contrails AI
                            </span>
                        </div>

                        {/* Links and Social Section */}
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                            
                            {/* Footer Links */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                                {footerLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-sm hover:text-primary transition-colors font-outfit relative group"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-primary transition-colors p-1 rounded-full hover:bg-white/10"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center mt-8 md:mt-12 pt-6">
                        <p className="text-sm font-outfit text-black font-thin">
                            © {new Date().getFullYear()} Contrails AI. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer