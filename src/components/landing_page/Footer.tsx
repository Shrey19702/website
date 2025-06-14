import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { WavyBackground } from "../wavy-background"


const Footer = () => {
    return (
        <footer className="relative pt-12  ">
            <WavyBackground className="max-w-full min-h-96 absolute top-0 left-0 w-full h-full z-0"
                colors={["#0253E4", "#0253E4", "#ffffff", "#ffffff"]}
                backgroundFill="transparent"
                blur={10}
            />


            <div className="w-full absolute flex flex-col justify-between bottom-0 left-0 z-10 mx-auto px-10 py-20 bg-gradient-to-b from-white to-white/10 backdrop-blur-xl h-56 ">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-6 md:mb-0">
                        <div className=" h-8 w-8 relative">
                            <Image alt="logo" src={"/logo.svg"} fill />
                        </div>
                        {/* <Shield className="h-6 w-6 text-[#0253E4]" /> */}
                        <span className="font-outfit text-2xl text-primary font-bold">Contrails AI</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        <Link
                            href="/"
                            className="text-sm hover:text-[#0253E4] transition-colors font-outfit relative group"
                        >
                            Privacy Policy
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0253E4] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/"
                            className="text-sm hover:text-[#0253E4] transition-colors font-outfit relative group"
                        >
                            Terms & Conditions
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0253E4] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <div className="flex items-center gap-4 mt-6 md:mt-0">
                            <Link href="https://twitter.com/contrails_ai" target="_blank" rel="noopener noreferrer" className="transition-colors h-5 w-5 hover:text-[#0253E4]">
                                {/* TWITTER /X */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 32 32"
                                    className="h-5 w-5 fill-current" // <--- Add fill-current here
                                >
                                    <path d="M 4.0175781 4 L 13.091797 17.609375 L 4.3359375 28 L 6.9511719 28 L 14.246094 19.34375 L 20.017578 28 L 20.552734 28 L 28.015625 28 L 18.712891 14.042969 L 27.175781 4 L 24.560547 4 L 17.558594 12.310547 L 12.017578 4 L 4.0175781 4 z M 7.7558594 6 L 10.947266 6 L 24.279297 26 L 21.087891 26 L 7.7558594 6 z"></path>
                                </svg>
                            </Link>
                            <Link href="https://www.linkedin.com/company/contrails-ai" target="_blank" rel="noopener noreferrer" className=" hover:text-[#0253E4] transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <p className="text-sm font-outfit">
                        © {new Date().getFullYear()} Contrails AI. All rights reserved.
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer;