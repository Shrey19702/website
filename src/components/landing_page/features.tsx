import React from "react";
import { cn } from "@/lib/utils";
// import createGlobe from "cobe";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion"
// import { motion } from "motion/react";
import { Video, AudioLines, Image } from "lucide-react";
import { InfiniteMovingCards } from "@/components/infinte_moving_cards";
import { div } from "framer-motion/client";
import ScalabilitySection from "@/components/animated_media/card_scalability"
import FastDetection from "@/components/animated_media/fast_detection"
import Support247 from "../animated_media/Support_247";

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Instant AI-Powered Deepfake Reports",
            description:
                "Upload any media file and receive an in-depth AI analysis in moments — complete with confidence scores and forensic insights.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r border-primary/20",
        },
        {
            title: "Lightning Fast Detection",
            description:
                "No more waiting hours. Our cutting-edge system delivers verified results in just minutes, even for high-resolution files.",
            skeleton: <FastDetection />,
            className:
                "border-b col-span-1 lg:col-span-2 border-primary/20",
        },
        {
            title: "Expert Support",
            description:
                "24/7 support for smooth and efficient operations",
            skeleton: <Support247 />,
            className:
                "col-span-1 lg:col-span-2 lg:border-r border-primary/20",
        },
        {
            title: "Scalability and Performance",
            description:
                "Platform scales to meet growing demands, ensuring peak performance.",
            skeleton: <ScalabilitySection />,
            className:
                "col-span-1 lg:col-span-4 ",
        }
    ];

    return (
        <div className="  rounded-3xl">

            <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto font-outfit">
                <div className="px-8">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-black dark:text-white">
                        Packed with All the features you need
                    </h4>

                    <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                        From Image checks to video checks, Every media form AI can generate has a check for it.
                    </p>
                </div>

                <div className="relative ">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-3xl border-primary/20">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} className={feature.className}>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                                <div className=" h-full w-full">{feature.skeleton}</div>
                            </FeatureCard>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

const FeatureCard = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p
            className={cn(
                "text-sm md:text-base text-left",
                "text-neutral-500 text-center font-normal dark:text-neutral-300",
                "text-left max-w-lg mx-0 md:text-sm my-2"
            )}
        >
            {children}
        </p>
    );
};

export const SkeletonOne = () => {
    return (
        <div className="relative flex py-8 px-2 gap-10 h-[650px]">
            <div className="w-full rounded-xl  p-5 bg-white dark:bg-neutral-900 shadow-2xl group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
                    {/* TODO */}
                    <img
                        src="/features_2/report.png"
                        alt="header"
                        width={800}
                        height={500}
                        className="h-full w-full aspect-square object-contain object-left-top rounded-sm"
                    />
                </div>
            </div>

            {/* <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
            <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" /> */}
        </div>
    );
};

export const SkeletonThree = () => {
    return (
        <a
            href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
            target="__blank"
            className="relative flex gap-10  h-full group/image"
        >
            <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">

                </div>
            </div>
        </a>
    );
};

export const SkeletonTwo = () => {
    const images = [
        "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const imageVariants = {
        whileHover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
        whileTap: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
    };
    return (
        <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
            {/* TODO */}
            <div className="flex flex-row -ml-20">
                {images.map((image, idx) => (
                    <motion.div
                        variants={imageVariants}
                        key={"images-first" + idx}
                        style={{
                            rotate: 14 - 10,
                        }}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white  dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                    >
                        <img
                            src={image}
                            alt="bali images"
                            width="500"
                            height="500"
                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                        />
                    </motion.div>
                ))}
            </div>
            <div className="flex flex-row">
                {images.map((image, idx) => (
                    <motion.div
                        key={"images-second" + idx}
                        style={{
                            rotate: 7 - 10,
                        }}
                        variants={imageVariants}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                    >
                        <img
                            src={image}
                            alt="bali images"
                            width="500"
                            height="500"
                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                        />
                    </motion.div>
                ))}
            </div>

            {/* <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent  h-full pointer-events-none" />
            <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black  to-transparent h-full pointer-events-none" /> */}
        </div>
    );
};

export const SkeletonFour = () => {

    let videoFormats = [
        { name: "mp4", type: "Video" },
        { name: "mov", type: "Video" },
        { name: "webm", type: "Video" },
        { name: "mpeg", type: "Video" },
        { name: "m3u8", type: "Video" }
    ];
    let audioFormats = [
        { name: "mp3", type: "Audio" },
        { name: "wav", type: "Audio" },
        { name: "flac", type: "Audio" },
        { name: "m4a", type: "Audio" },
        { name: "m4b", type: "Audio" },
    ];
    let imageFormats = [
        { name: "jpg", type: "Image" },
        { name: "png", type: "Image" },
        { name: "webp", type: "Image" },
        { name: "jpeg", type: "Image" },
    ];

    return (
        <div className=" rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={videoFormats as { name: string; type: string }[]}
                direction="right"
                speed="slow"
            />
            <InfiniteMovingCards
                items={audioFormats as { name: string; type: string }[]}
                direction="left"
                speed="slow"
            />
            <InfiniteMovingCards
                items={imageFormats as { name: string; type: string }[]}
                direction="right"
                speed="slow"
            />
        </div>
    );
};
