"use client";
import { UserCircle, Heart, Share2, MessageCircleMore, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type Category = {
    name: string;
    color: string;
    percentage?: number;
};

export default function ContentFilter() {

    const category_choices = [
        [
            { name: "Drugs Abuse", color: "bg-rose-500", percentage: 92 },
            { name: "Hate Speech", color: "bg-amber-500", percentage: 8 },
            { name: "Violence", color: "bg-orange-500", percentage: 0 },
            { name: "Sectarianism", color: "bg-yellow-500", percentage: 0 },
            { name: "Terrorism", color: "bg-red-400", percentage: 0 }
        ],
        [
            { name: "Drugs Abuse", color: "bg-rose-500", percentage: 0 },
            { name: "Hate Speech", color: "bg-amber-500", percentage: 89 },
            { name: "Violence", color: "bg-orange-500", percentage: 92 },
            { name: "Sectarianism", color: "bg-yellow-500", percentage: 0 },
            { name: "Terrorism", color: "bg-red-400", percentage: 0 }
        ],
        [
            { name: "Drugs Abuse", color: "bg-rose-500", percentage: 0 },
            { name: "Hate Speech", color: "bg-amber-500", percentage: 0 },
            { name: "Violence", color: "bg-orange-500", percentage: 0 },
            { name: "Sectarianism", color: "bg-yellow-500", percentage: 62 },
            { name: "Terrorism", color: "bg-red-400", percentage: 91 }
        ]
    ];

    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>( category_choices[ Math.round(Math.random()*2) ] );

    const handleMouseEnter = () => {
        // setIsHovered(true);
        // setIsLoading(false);
        // setCategories([]);
        setIsLoading(false);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsLoading(true);
        setCategories( category_choices[ Math.round(Math.random()*2) ] );
    };

    useEffect(() => {
        // show results
        const time1 = setInterval(() => {
            if (isHovered) {
                // setIsHovered(false);
                return
            }
            if (isLoading)
                setIsLoading(false);
        }, 4000);

        // show loading
        const time2 = setInterval(() => {
            if (isHovered) {
                // setIsHovered(false);
                return
            }
            setIsLoading(true);
            setCategories( category_choices[ Math.round(Math.random()*2) ] )
        }, 8000);

        return () => {
            clearInterval(time1);
            clearInterval(time2);
        };

    }, [])


    // console.log(isLoading);


    return (
        <div
            className="flex items-center px-4 py-4 w-full h-full max-w-lg xl:max-w-3xl bg- font-outfit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* user Post */}
            <div className="bg-slate-600 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105">
                {/* top user*/}
                <div className="bg-slate-300 w-full h-fit p-1 flex gap-2 items-center">
                    <UserCircle className="w-8 h-8 text-slate-500" />
                    <div className="flex flex-col gap-1">
                        <div className="h-2 w-12 md:w-20 rounded-full bg-slate-400" />
                        <div className="h-2 w-4 md:w-8 rounded-full bg-slate-400" />
                    </div>
                </div>

                {/* content */}
                <div className="w-28 md:w-48 h-28 md:h-48 bg-slate-100 overflow-hidden relative">
                    <div className={`absolute inset-0 transition-all duration-700 blur-sm `}>
                        <div className="flex">
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/80" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/40" />
                        </div>
                        <div className="flex">
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/40" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/80" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                        </div>
                        <div className="flex">
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/80" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/40" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                        </div>
                        <div className="flex">
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/40" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/80" />
                            <div className="h-7 md:h-12 w-7 md:w-12 bg-primary/40" />
                        </div>
                    </div>

                </div>

                {/* bottom like comment share */}
                <div className="bg-slate-300 w-full h-fit p-1 flex gap-2 items-center">
                    <Heart className=" size-3 md:size-6 text-slate-500" />
                    <div className="h-3 w-2 md:w-5 pr-1 rounded-full bg-slate-400" />
                    <MessageCircleMore className=" size-3 md:size-6 text-slate-500" />
                    <div className="h-3 w-2 md:w-5 pr-1 rounded-full bg-slate-400" />
                    <Share2 className=" size-3 md:size-6 text-slate-500" />
                    <div className="h-3 w-2 md:w-5 rounded-full bg-slate-400" />
                </div>
            </div>

            {/* Arrow Animation */}
            <div className="h-2 w-16 md:w-32 relative overflow-hidden">
                {/* {isLoading && ( */}
                <div className={`absolute inset-0 transition-all duration-700 ${isLoading ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse' : ' bg-gradient-to-r from-green-500 to-emerald-500 '}`}></div>
                {/* )} */}
            </div>

            {/* Analysis Results Panel */}
            <div className={` relative overflow-hidden rounded-3xl bg-primary flex flex-col items-center justify-start gap-3 md:gap-5 py-4 md:py-10 px-3 md:px-6 min-w-32 md:min-w-64 transition-all duration-500 ${isLoading ? '' : ''}`}>

                <div className={`absolute rounded-3xl overflow-hidden z-10  top-1/2 -translate-y-1/2 ${isLoading ? "w-32 md:w-64" : "w-0"} transition-all duration-700 h-full bg-primary/50 backdrop-blur-sm text-white font-bold flex flex-col items-center justify-center gap-2 text-xs md:text-xl`}>
                    <Loader2 className="size-8 animate-spin" />
                    <span>
                        Processing Content...
                    </span>
                </div>

                {/* // Results state - percentage results */}
                {categories.map((category, index) => (
                    <div key={index} className={`w-full ${isLoading ? "animate-pulse" : "animate-slideIn"}`} style={{ animationDelay: `${index * 100}ms` }}>
                        <div className=" w-full h-6 md:h-9 bg-white rounded-full overflow-hidden relative">
                            <div className=" relative z-10 px-2 h-full flex justify-between items-center text-primary ">
                                <span className={` ${isLoading ? "text-white bg-white" : " bg-transparent text-black"} text-xs md:text-base font-bold transition-all duration-300 rounded-full `}>{category.name}</span>
                                <span className={` ${isLoading ? "text-white bg-white" : " bg-transparent text-black"} text-xs md:text-base font-bold transition-all duration-300 rounded-full `}>{category ? category.percentage : 0}%</span>
                            </div>
                            <div
                                className={`absolute top-0 h-6 md:h-9 rounded-full transition-all duration-1000 ease-out ${category.color}`}
                                style={{
                                    width: `${category.percentage}%`,
                                    animationDelay: `${index * 150}ms`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}

            </div >

        </div >
    );
}