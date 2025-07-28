"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, UserCircle } from 'lucide-react';

const MisinformationGuard: React.FC = () => {
    const media_card_scroller = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [red_count, setRedCount] = useState(3179);
    const [green_count, setGreenCount] = useState(7342);

    const cases = [true, false, true, true];

    const [progressWidth, setProgressWidth] = useState('0%');
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Consolidated useEffect for all synchronized animations
    useEffect(() => {
        let currentIndex = 0;
        const cardHeight = 240; // px
        const maxIndex = 3; // 0, 1, 2, 3 (4 cards)
        let timeouts: NodeJS.Timeout[] = [];

        const animationCycle = () => {
            // --- 1. START SCROLL & PROGRESS BAR ANIMATIONS (at t=0s) ---

            // Increment index for the next card
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }

            // Scroll the card
            if (media_card_scroller.current) {
                const newTop = -(currentIndex * cardHeight);
                media_card_scroller.current.style.top = `${newTop}px`;
            }

            // This state is used by the ping animation logic
            setCount(currentIndex);

            // Reset progress bar and loading state
            setIsLoading(true);
            setIsTransitioning(false); // Instantly snap to 0%
            setProgressWidth('0%');

            // In the next "tick", re-apply transition and start animation to 100%
            timeouts.push(setTimeout(() => {
                setIsTransitioning(true);
                setProgressWidth('100%');
            }, 50)); // Small delay for browser to apply the 0% width first

            // --- 2. SCHEDULE ACTIONS FOR WHEN PROGRESS BAR FINISHES (at t=1.6s) ---
            timeouts.push(setTimeout(() => {
                setIsLoading(false); // This triggers the "ping" animation

                // **Increment the count at the same time the ping happens**
                if (cases[currentIndex]) {
                    setGreenCount(prev => prev + 1);
                } else {
                    setRedCount(prev => prev + 1);
                }
            }, 1600)); // Corresponds to the progress bar animation duration
        };

        // Start the first cycle immediately
        animationCycle();

        // Set the interval for all subsequent cycles
        const interval = setInterval(animationCycle, 3000);

        // --- 3. CLEANUP ---
        // Clear interval and any pending timeouts when the component unmounts
        return () => {
            clearInterval(interval);
            timeouts.forEach(clearTimeout);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className=' flex items-center h-full w-full md:w-[630px] justify-center '>
            {/* person card scroll animation */}
            <div className='h-60 md:py-10 w-[140px] md:w-72 overflow-hidden flex justify-center '>
                <div
                    id='media-card-scroller'
                    ref={media_card_scroller}
                    className=' relative flex flex-col items-center gap-20 -top-[0px] transition-all duration-500 h-[880px] '
                >
                    {/* Skeletons... */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className=' border px-4 py-3 w-32 md:w-72 h-40 bg-slate-300 rounded-3xl flex flex-col gap-3 '>
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
                    ))}
                </div>
            </div>

            {/* Continuous progress bar animation */}
            <div className=' w-16 md:w-24 h-2 bg-slate-200 rounded-full overflow-hidden mx-4'>
                <div
                    className='h-full bg-gradient-to-r from-green-400 via-sky-400 to-blue-500 rounded-full'
                    style={{
                        width: progressWidth,
                        transition: isTransitioning ? 'width 1600ms linear' : 'none'
                    }}
                />
            </div>

            <div className='  gap-5  flex flex-col'>
                {/* GREEN */}
                <div className='flex flex-col  items-center gap-8'>
                    <div className=' relative h-20 w-20 bg-green-300 rounded-full'>
                        <div className=' z-10 absolute inset-0 flex items-center justify-center'>
                            <CheckCircle className='size-10' />
                        </div>
                        <div className={` z-0 absolute top-0 opacity-50 ${!isLoading && cases[count] ? "scale-110 animate-ping" : "scale-100"} transition-all h-full w-full rounded-full bg-green-400`} />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='text-2xl text-green-400 font-semibold'>
                            {green_count}
                        </div>
                        <div className=' text-xs md:text-base text-center font-bold text-slate-600'>
                            Safe Content
                        </div>
                    </div>
                </div>

                {/* RED */}
                <div className='flex flex-col  items-center gap-5'>
                    <div className=' relative h-20 w-20 bg-red-300 rounded-full'>
                        <div className=' z-10 absolute inset-0 flex items-center justify-center'>
                            <AlertTriangle className='size-10' />
                        </div>
                        <div className={` z-0 absolute top-0 opacity-50 ${!isLoading && !cases[count] ? "scale-110 animate-ping" : "scale-100"} transition-all h-full w-full rounded-full bg-red-400`} />
                    </div>

                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='text-2xl text-red-400 font-semibold'>
                            {red_count}
                        </div>
                        <div className=' text-xs md:text-base text-center font-bold text-slate-600'>
                            Flagged Content
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MisinformationGuard;