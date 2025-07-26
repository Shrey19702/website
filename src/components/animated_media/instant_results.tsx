
const Instant_results = () => {

    return (
        <>
            <div className="relative z-10 flex flex-col gap-10 group text-primary bg-white pb-3 px-4 pt-0 rounded-xl -top-2">
                <div>
                    <div className="font-bold text-xl py-2">
                        Frame Results
                    </div>
                    <img src="/features_2/video_results.png" alt="audio_result" className="rounded-2xl transition-all " />
                </div>
                <div>
                    <div className="font-bold text-xl py-2">
                        Audio Results
                    </div>
                    <div className="  ">
                        <img src="/features_2/audio_results.png" alt="audio_result" className="rounded-2xl" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Instant_results;