
import { AudioLinesIcon, ClapperboardIcon, LucideImage, UploadCloudIcon, FileVideo, FileAudio, FileImage, BadgeCheck } from "lucide-react"
import { useState } from "react";
import { useEffect } from "react";

const Multimodal_checks = () => {
    const [selected_image, set_selected_image] = useState(false);
    const [selected_audio, set_selected_audio] = useState(true);
    const [selected_video, set_selected_video] = useState(true);
    const [uploaded, set_uploaded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    useEffect(() => {
        if (!uploaded) return;
        const timer = setTimeout(() => {
            set_uploaded(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [uploaded]);

    return (
        <div className="h-full w-full rounded-3xl overflow-hidden relative z-10">

            <div className=" rounded-3xl h-full w-full flex flex-col">

                {
                    !uploaded && (

                        <div className="text-black  flex items-center justify-evenly gap-4 p-4">
                            {/* image */}
                            <div
                                className={`flex flex-col items-center w-fit shadow shadow-primary rounded-3xl  p-3 cursor-pointer bg-white z-10 relative `}
                                onClick={() => {
                                    set_selected_image(!selected_image);
                                    set_selected_audio(false);
                                    set_selected_video(false);
                                }}
                            >
                                <div className="h-6 w-6 shadow-inner shadow-primary rounded-full p-1">
                                    {
                                        selected_image &&
                                        <div className="h-4 w-4 bg-primary shadow shadow-primary rounded-full" />
                                    }
                                </div>
                                <div className="font-bold text-primary">
                                    Image
                                </div>
                                <div className="text-primary">
                                    <LucideImage className="size-16" />
                                </div>
                            </div>
                            {/* audio */}
                            <div
                                className="flex flex-col items-center w-fit shadow shadow-primary rounded-3xl  p-3 cursor-pointer bg-white z-10 relative "
                                onClick={() => { set_selected_audio(!selected_audio); set_selected_image(false); }}
                            >
                                <div className="h-6 w-6 shadow-inner shadow-primary rounded-full p-1">
                                    {
                                        selected_audio &&
                                        <div className="h-4 w-4 bg-primary shadow shadow-primary rounded-full" />
                                    }
                                </div>
                                <div className="font-bold text-primary">
                                    Audio
                                </div>
                                <div className="text-primary">
                                    <AudioLinesIcon className="size-16" />
                                </div>
                            </div>
                            {/* video */}
                            <div
                                className="flex flex-col items-center w-fit shadow shadow-primary rounded-3xl  p-3 cursor-pointer bg-white z-10 relative "
                                onClick={() => { set_selected_video(!selected_video); set_selected_image(false); }}
                            >
                                <div className="h-6 w-6 shadow-inner shadow-primary rounded-full p-1">
                                    {
                                        selected_video &&
                                        <div className="h-4 w-4 bg-primary shadow shadow-primary rounded-full" />
                                    }
                                </div>
                                <div className="font-bold text-primary">
                                    Video
                                </div>
                                <div className="text-primary">
                                    <ClapperboardIcon className="size-16" />
                                </div>
                            </div>

                        </div>
                    )
                }


                <div
                    className="mouse_tracking h-full w-full flex items-center justify-center relative "
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {
                        !uploaded &&
                        <div
                            className="p-3 rounded-full bg-amber-500 absolute"
                            style={{
                                left: isHovering ? `${mousePos.x}px` : '10%',
                                top: isHovering ? `${mousePos.y}px` : '15%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {
                                selected_video ?
                                    <FileVideo className="size-8" />
                                    :
                                    selected_audio ?
                                        <FileAudio className="size-8" />
                                        :
                                        <FileImage className="size-8" />
                            }
                        </div>
                    }

                    {
                        uploaded ? (
                            <div
                                className=" h-3/4 w-3/4 rounded-3xl flex flex-col items-center justify-center bg-green-600"
                                onMouseEnter={() => { set_uploaded(true) }}
                            >
                                <BadgeCheck className="size-16" />
                                <div>
                                    FILE UPLOADED SUCESSFULLY
                                </div>
                            </div>
                        )
                            :
                            (
                                <div
                                    className="bg-white/50 backdrop-blur-sm h-1/2 md:h-3/4 w-3/4 md:w-1/2 rounded-3xl border-4 border-dotted border-primary flex flex-col items-center justify-center cursor-pointer "
                                    onMouseEnter={() => {
                                        if (selected_audio || selected_image || selected_video)
                                            set_uploaded(true);
                                    }}
                                >
                                    <UploadCloudIcon className="size-16" />
                                    <div>
                                        DRAG AND DROP YOUR FILE
                                    </div>
                                </div>
                            )
                    }
                </div>

            </div>

        </div>
    )

}

export default Multimodal_checks;