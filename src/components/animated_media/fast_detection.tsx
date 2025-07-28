import { Upload, Loader2, FileBarChart2, FileVideoIcon, FileImageIcon, FileVolume } from "lucide-react"

const FastDetection = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-16 py-6 overflow-hidden relative group">
                {/* --- Animated Line --- */}
                {/* 
                  - We use an absolute div for the line, centered horizontally.
                  - `top-16` and `bottom-16` make the line connect the items without touching the very top/bottom.
                  - `bg-gradient-to-b` creates the vertical gradient. The `from/to-transparent` with a color `via` creates the "pulse" effect.
                  - `animate-flow-line` is our custom animation class from tailwind.config.js.
                */}
                <div
                    className=" absolute w-2 h-[90%] bg-gradient-to-b from-transparent to-primary animate-flow-line z-10 transition-all duration-500 -top-full group-hover:translate-y-full "
                />
                {/* --- End of Animated Line --- */}

                {/* Using `z-10` on the items ensures they are rendered on top of the line */}
                <div className="h-32 w-32 rounded-3xl bg-primary p-4 group z-10 text-white">
                    <div className=" relative z-10 rounded-3xl border-4  border-dotted border-slate-300 bg-white/30  h-full w-full p-3 flex items-center justify-center">
                        <Upload className=" size-8 text-white  transition-all" />
                    </div>
                    <div className="z-0 overflow-hidden -top-16 font-bold text-lg w-20 -right-32 transition-all relative text-black">
                        Upload
                    </div>
                    <div className="z-0 text-gray-50 overflow-hidden -top-32 font-bold text-lg w-20 group-hover:w-0 group-hover:left-0 -left-20 transition-all relative ">
                        <FileVideoIcon className="size-10 p-2 rounded-full bg-cyan-400 " />
                    </div>
                    <div className="z-0 overflow-hidden -top-28 font-bold text-lg w-20 group-hover:w-0 group-hover:left-0 -left-24 transition-all relative text-gray-50 text-">
                        <FileVolume className="size-10 p-2 rounded-full bg-rose-400 " />
                    </div>
                    <div className="z-0 overflow-hidden -top-[185px] font-bold text-lg w-20 group-hover:w-0 group-hover:left-0 -left-32 transition-all relative text-gray-50 text-">
                        <FileImageIcon className="size-10 p-2 rounded-full bg-emerald-400 " />
                    </div>
                </div>

                <div className="h-32 w-32 rounded-3xl bg-primary p-4 group z-10">
                    <div className=" rounded-3xl h-full w-full p-3 flex items-center justify-center">
                        <Loader2 className=" animate-spin size-10 text-white group-hover:" />
                    </div>

                    <div className="z-0 overflow-hidden -top-16 font-bold text-lg w-20 -left-24 transition-all relative text-black">
                        Process
                    </div>
                </div>

                <div className="h-32 w-32 rounded-3xl bg-primary p-4 group z-20">
                    <div className=" rounded-3xl h-full w-full p-3 flex items-center justify-center">
                        <FileBarChart2 className=" size-10 text-white group-hover:animate-pulse" />
                    </div>
                    
                    <div className="z-0 overflow-hidden -top-16 font-bold text-lg w-20 -left-24 transition-all relative text-black">
                        Results
                    </div>
                </div>


                <div className=" top-[75%] left-36 group-hover:left-[270px] md:group-hover:left-64 transition-all absolute rounded-e-3xl rounded-t-3xl bg-green-400 text-white font-bold text-2xl p-3">
                    <div className="z-10 relative">
                        Done
                    </div>
                    <div className=" z-0 absolute bg-green-400 h-full w-full top-0 left-0 rounded-full group-hover:animate-pulse" />
                </div>
            </div>
        </>
    )
}

export default FastDetection;