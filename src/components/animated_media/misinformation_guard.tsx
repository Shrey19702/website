"use client";
import React, { useState, useEffect, useRef } from 'react';

import { AlertTriangle, CheckCircle, UserCircle } from 'lucide-react';

const MisinformationGuard: React.FC = () => {

    const media_card_scroller = useRef<HTMLDivElement>(null);
    const [count, setcount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [red_count, setRedCount] = useState(3179);
    const [green_count, setGreenCount] = useState(7342);

    const cases = [true, false, true, true];

    // State for the animated dots
    const [dotOpacities, setDotOpacities] = useState([0, 0, 0, 0]);

    useEffect(() => {
        let currentIndex = 0;
        const cardHeight = 240; // px
        const maxIndex = 3; // 0,1,2,3 (4 cards)
        const interval = setInterval(() => {
            if (media_card_scroller.current) {
                currentIndex++;
                if (currentIndex > maxIndex) {
                    currentIndex = 0;
                }
                const newTop = -(currentIndex * cardHeight);
                media_card_scroller.current.style.top = `${newTop}px`;
                setcount(currentIndex);
                cases[currentIndex] ? setGreenCount(prev => prev + 1) : setRedCount(prev => prev + 1);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Dots animation effect
    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];
        let interval: NodeJS.Timeout;

        const animateDots = () => {
            setDotOpacities([0, 0, 0, 0]);
            // Fade in each dot with 0.4s offset
            for (let i = 0; i < 4; i++) {
                timeouts.push(setTimeout(() => {
                    setDotOpacities(prev => {
                        const newArr = [...prev];
                        newArr[i] = 1;
                        return newArr;
                    });
                }, 400 * (i + 1)));
            }

            timeouts.push(setTimeout(() => {
                setIsLoading(false);
            }, 1600));

            // Fade out all at 3s
            timeouts.push(setTimeout(() => {
                setDotOpacities([0, 0, 0, 0]);
                setIsLoading(true);
            }, 3000));
        };

        animateDots();
        interval = setInterval(() => {
            animateDots();
        }, 3000);

        return () => {
            timeouts.forEach(t => clearTimeout(t));
            clearInterval(interval);
        };
    }, []);

    return (
        <div className=' flex items-center h-full w-[630px] justify-center '>

            {/* person card scroll animation */}
            <div className='h-60 py-10 w-78 overflow-hidden flex justify-center '>

                <div id='media-card-scroller' ref={media_card_scroller} className=' relative flex flex-col items-center gap-20 -top-[0px] transition-all duration-300 h-[880px]   '>

                    {/* CONTENT SKELETON */}
                    <div className=' border px-4 py-3 w-72 h-40 bg-slate-300 rounded-3xl flex flex-col gap-3 '>

                        <div className='flex  '>
                            <UserCircle className=' size-12 text-slate-500' />
                            <div className='w-full flex flex-col gap-2 py-2 pl-3'>
                                <div className=' h-3 bg-slate-400 rounded-full w-3/4  '></div>
                                <div className=' h-3 bg-slate-400 rounded-full w-1/5 '></div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <div className=' h-3 bg-slate-400 rounded-full w-full'></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-3/4 '></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-4/5 '></div>
                        </div>

                    </div>

                    {/* CONTENT SKELETON */}
                    <div className=' border px-4 py-3 w-72 h-40 bg-slate-300 rounded-3xl flex flex-col gap-3 '>

                        <div className='flex  '>
                            <UserCircle className=' size-12 text-slate-500' />
                            <div className='w-full flex flex-col gap-2 py-2 pl-3'>
                                <div className=' h-3 bg-slate-400 rounded-full w-3/4  '></div>
                                <div className=' h-3 bg-slate-400 rounded-full w-1/5 '></div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <div className=' h-3 bg-slate-400 rounded-full w-full'></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-3/4 '></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-4/5 '></div>
                        </div>

                    </div>


                    {/* CONTENT SKELETON */}
                    <div className=' border px-4 py-3 w-72 h-40 bg-slate-300 rounded-3xl flex flex-col gap-3 '>

                        <div className='flex  '>
                            <UserCircle className=' size-12 text-slate-500' />
                            <div className='w-full flex flex-col gap-2 py-2 pl-3'>
                                <div className=' h-3 bg-slate-400 rounded-full w-3/4  '></div>
                                <div className=' h-3 bg-slate-400 rounded-full w-1/5 '></div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <div className=' h-3 bg-slate-400 rounded-full w-full'></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-3/4 '></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-4/5 '></div>
                        </div>

                    </div>


                    {/* CONTENT SKELETON */}
                    <div className=' border px-4 py-3 w-72 h-40 bg-slate-300 rounded-3xl flex flex-col gap-3 '>

                        <div className='flex  '>
                            <UserCircle className=' size-12 text-slate-500' />
                            <div className='w-full flex flex-col gap-2 py-2 pl-3'>
                                <div className=' h-3 bg-slate-400 rounded-full w-3/4  '></div>
                                <div className=' h-3 bg-slate-400 rounded-full w-1/5 '></div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 '>
                            <div className=' h-3 bg-slate-400 rounded-full w-full'></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-3/4 '></div>
                            <div className=' h-3 bg-slate-400 rounded-full w-4/5 '></div>
                        </div>

                    </div>

                </div>
            </div>

            {/* wait line animation */}
            <div className='flex gap-2'>
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        className='h-2 w-5 bg-slate-300 relative rounded-full transition-opacity duration-200'
                        style={{ opacity: dotOpacities[i] }}
                    />
                ))}
            </div>

            <div className='  gap-5  flex flex-col'>
                {/* GREEN */}
                <div className='flex items-center gap-8'>
                    <div className=' relative h-20 w-20 bg-green-300 rounded-full'>
                        <div className=' z-10 absolute inset-0 flex items-center justify-center'>
                            <CheckCircle className='size-10'/>
                        </div>
                        <div className={` z-0 absolute top-0 opacity-50 ${!isLoading && cases[count] ? "scale-110 animate-ping" : "scale-100"} transition-all duration-[1.6s] h-full w-full rounded-full bg-green-400`} />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='text-2xl text-green-400 font-semibold'>
                            {green_count}
                        </div>
                        <div className=' font-bold text-slate-600'>
                            Safe Content
                        </div>
                    </div>
                </div>

                {/* RED */}
                <div className='flex items-center gap-5'>
                    <div className=' relative h-20 w-20 bg-red-300 rounded-full'>
                        <div className=' z-10 absolute inset-0 flex items-center justify-center'>
                            <AlertTriangle className='size-10'/>
                        </div>
                        <div className={` z-0 absolute top-0 opacity-50 ${!isLoading && !cases[count] ? "scale-110 animate-ping" : "scale-100"} transition-all duration-[1.6s] h-full w-full rounded-full bg-red-400`} />
                    </div>

                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='text-2xl text-red-400 font-semibold'>
                            {red_count}
                        </div>
                        <div className=' font-bold text-slate-600'>
                            Flagged Content
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MisinformationGuard; 