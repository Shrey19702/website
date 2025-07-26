import { UserRoundIcon, HeadsetIcon, User } from "lucide-react"

const Support247 = () => {

    return (
        <>
            <div className=" w-full h-full flex flex-col items-center justify-end gap-4 pb-28 group">
                {/* user chat */}
                <div className="flex gap-3 w-full justify-end">
                    <div className=" bg-slate-300 rounded rounded-l-3xl rounded-t-3xl max-w-60 py-3 px-6 flex flex-col gap-4 ">
                        <p className="text-base">
                            Hi, I am having trouble understanding the report.
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                            2 mins ago
                        </p>
                    </div>

                    <div className=" flex items-end">
                        <div className="p-3 bg-slate-700 rounded-full">
                            <UserRoundIcon className=" text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-start">

                    {/* user chat */}
                    <div className="flex gap-3">

                        <div className=" flex items-end">
                            <div className="p-3 bg-primary rounded-full relative">
                                <HeadsetIcon className=" text-white" />
                            </div>
                        </div>

                        <div className=" bg-primary rounded rounded-r-3xl rounded-t-3xl max-w-60 pt-3 px-5 flex flex-col ">
                            <div className="text-lg text-white h-fit max-h-0 max-w-0 group-hover:max-w-52 group-hover:max-h-52 transition-all duration-700 overflow-hidden">
                                <p className=" max-h-0 group-hover:max-h-52 group-hover:mb-4 w-52 transition-all">
                                    No problem! how can i assist you?
                                </p>
                                <p className=" max-h-0 group-hover:max-h-52 w-52 transition-all text-xs font-semibold text-slate-200">
                                    1 mins ago
                                </p>
                            </div>
                            <div className=" font-extrabold text-xl flex gap-1 group-hover:opacity-0 group-hover:w-0 opacity-100 py-2 px-2 transition-all duration-300">
                                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                                <div className="w-2 h-2 bg-slate-200 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Support247