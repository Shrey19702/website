
const Instant_results = () => {

    return (
        <div className="h-full flex items-center justify-center">
            <div className=" h-fit relative z-10 flex flex-col gap-10 group text-white  px-4 pt-0 rounded-xl ">
                <div>
                    <div className="font-bold text-xl py-2">
                        Frame Results
                    </div>
                    <img src="/features_2/video_results.png" alt="audio_result" className="rounded " />
                </div>
                <div>
                    <div className="font-bold text-xl py-2">
                        Audio Results
                    </div>
                    <div className="  ">
                        <img src="/features_2/audio_results.png" alt="audio_result" className="rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instant_results;