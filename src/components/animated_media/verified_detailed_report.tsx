import Image from "next/image";
const Verified_detailed_report = () => {
    return (
        <>
            <div className="flex flex-col flex-wrap w-full h-full justify-between items-center">

                <div className="  flex w-full justify-evenly">

                    <div className=" bg-white/30 backdrop-blur px-5 py-4  rounded-3xl flex flex-col justify-between">
                        <div className="text-lg font-semibold pl-2 pb-3">
                            Scores
                        </div>

                        <div className="flex gap-2 flex-col flex-wrap items-center justify-center max-h-36">
                            <div className="bg-red-50 text-black w-fit p-1 rounded-2xl px-3 shadow-red-600 shadow">
                                <div className="w-full flex justify-between" >
                                    <span className="min-w-32">
                                        Frame Result
                                    </span>
                                    <span className="w-full flex items-center justify-center text-red-600 font-bold ">
                                        Fake
                                    </span>
                                </div>
                                <div className="w-full flex justify-between" >
                                    <span className="min-w-32 font-semibold">
                                        Score
                                    </span>
                                    <span className="w-full flex items-center justify-center text-red-600 font-bold ">
                                        <span className="bg-red-200 px-4 rounded-full border-red-600 border">
                                            20.4%
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 bg-green-50 text-black w-fit p-1 rounded-2xl px-3 shadow-green-600 shadow">
                                <div className="w-full flex justify-between" >
                                    <span className="min-w-32">
                                        Audio Result
                                    </span>
                                    <span className="w-full flex items-center justify-center text-green-600 font-bold ">
                                        Real
                                    </span>
                                </div>
                                <div className="w-full flex justify-between" >
                                    <span className="min-w-32 font-semibold">
                                        Score
                                    </span>
                                    <span className="w-full flex items-center justify-center text-green-600 font-bold ">
                                        <span className="bg-green-200 px-4 rounded-full border-green-600 border">
                                            94.4%
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-red-50 h-full text-black rounded-2xl px-3 py-2 shadow-red-600 shadow">
                                <div className="flex flex-col justify-between" >
                                    <span className="min-w-20 text-center">
                                        Image Result
                                    </span>
                                    <span className=" flex items-center justify-center text-red-600 font-bold ">
                                        Fake
                                    </span>
                                </div>
                                <div className=" flex flex-col items-center mt-2" >
                                    <span className="min-w-10 font-semibold">
                                        Score
                                    </span>
                                    <span className="w-full flex items-center justify-center text-red-600 font-bold ">
                                        <span className="bg-red-200 px-4 rounded-full border-red-600 border">
                                            10.5%
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" bg-white/30 backdrop-blur rounded-3xl px-5 py-4">
                        <div className="text-lg font-semibold pl-2 ">
                            bbox detections
                        </div>
                        <div className=" flex items-center justify-center h-full w-40 overflow-hidden ">
                            <Image
                                className="rounded-xl"
                                src="/features_2/bbox.png"
                                alt="Graph"
                                width={530}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
                <div className=" h-[49%]  w-[90%] bg-white/30 backdrop-blur rounded-3xl px-5 flex flex-col items-center justify-evenly">
                    <div className="text-lg font-semibold pl-2 w-full ">
                        Graphs
                    </div>
                    <div className="">
                        <Image
                            className="rounded-xl"
                            src="/features_2/graph.png"
                            alt="Graph"
                            width={500}
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verified_detailed_report;