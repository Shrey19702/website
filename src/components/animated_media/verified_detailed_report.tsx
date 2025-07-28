import Image from "next/image";

const Verified_detailed_report = () => {
    const scores = [
        {
            title: "Frame Result",
            result: "Fake",
            score: "20.4%",
            type: "fake"
        },
        {
            title: "Audio Result",
            result: "Real",
            score: "94.4%",
            type: "real"
        },
        {
            title: "Image Result",
            result: "Fake",
            score: "10.5%",
            type: "fake"
        }
    ];

    const getScoreStyles = (type: string) => {
        if (type === "fake") {
            return {
                bg: "bg-red-50",
                text: "text-red-600",
                scoreBg: "bg-red-200",
                border: "border-red-600",
                shadow: "shadow-red-600"
            };
        }
        return {
            bg: "bg-green-50",
            text: "text-green-600",
            scoreBg: "bg-green-200",
            border: "border-green-600",
            shadow: "shadow-green-600"
        };
    };

    return (
        <div className="flex flex- flex-wrap w-full h-full justify-between gap-1 ">

            {/* Scores Section */}
            <div className=" md:max-h-36  px-4 md:px-5 py-2 rounded-3xl flex flex-col justify-between flex-1 md:flex-none">
                <div className="text-base md:text-lg font-semibold pl-2 pb-1">
                    Scores
                </div>

                <div className=" md:max-h-32 flex flex-row md:flex-col flex-wrap gap-2 md:gap-3 items-center justify-center">
                    {scores.map((score, index) => {
                        const styles = getScoreStyles(score.type);
                        return (
                            <div key={index} className={`${styles.bg} text-black min-w-fit p-2 md:p-1 rounded-2xl px-3 ${styles.shadow} shadow flex-shrink-0`}>
                                <div className="w-full flex flex-col md:flex-row justify-between gap-1">
                                    <span className="text-xs md:text-sm font-medium md:min-w-32">
                                        {score.title}
                                    </span>
                                    <span className={`flex items-center justify-center ${styles.text} font-bold text-xs md:text-sm`}>
                                        {score.result}
                                    </span>
                                </div>
                                <div className="w-full flex flex-col md:flex-row justify-between gap-1 mt-1">
                                    <span className="text-xs md:text-sm font-semibold md:min-w-32">
                                        Score
                                    </span>
                                    <span className={`flex items-center justify-center ${styles.text} font-bold`}>
                                        <span className={`${styles.scoreBg} px-2 md:px-4 py-1 rounded-full ${styles.border} border text-xs md:text-sm`}>
                                            {score.score}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top Section - Scores and BBox */}
            <div className="flex flex-col md:flex-row w-full justify-between gap-1 md:gap-6">

                {/* BBox Detection Section */}
                <div className=" relative rounded-3xl px-4 md:px-5 py-2 flex flex-col flex-1 md:flex-none">
                    <div className="text-base md:text-lg font-semibold pl-2 pb-1">
                        Bbox Detections
                    </div>
                    <div className="flex items-center justify-center flex-1 overflow-hidden">
                        <div className="relative w-full max-w-[200px] md:w-40 aspect-[4/3]">
                            <Image
                                className="rounded-xl object-cover"
                                src="/features_2/bbox.png"
                                alt="Bounding box detections"
                                fill
                                sizes="(max-width: 768px) 200px, 160px"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Graphs */}
                <div className="flex-1 min-h-36 w-full rounded-3xl px-4 md:px-5 py-1 flex flex-col">
                    <div className="text-base md:text-lg font-semibold pl-2 pb-1">
                        Analysis Graphs
                    </div>
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full rounded-3xl">
                            <Image
                                className=" object-contain"
                                src="/features_2/graph.png"
                                alt="Analysis graphs"
                                width={500}
                                height={500}
                                sizes="(max-width: 768px) 90vw, 500px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verified_detailed_report;