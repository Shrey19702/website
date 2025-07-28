import React from 'react';

// --- HELPER COMPONENTS --- //

// Reusable Card component for consistent styling
const DataCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-brand-surface-glass backdrop-blur-lg rounded-3xl p-6 border border-brand-border ${className}`}>
        {children}
    </div>
);

// Indicator for showing percentage change with an up/down arrow
const ChangeIndicator: React.FC<{ type: 'up' | 'down' | 'cyan'; value: string }> = ({ type, value }) => {
    const isUp = type === 'up';
    const color = "text-black";
    let bgColor = "";
    if (type === 'up' || type === 'down'){
        bgColor = isUp ? 'bg-green-300' : 'bg-red-300';
    }
    else{
        bgColor = "bg-cyan-400"
    }

    return (
        <div className={`flex items-center text-xs font-medium px-1 py-0.5 rounded-full ${color} ${bgColor}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-1">
                {isUp ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />}
            </svg>
            {value}
        </div>
    );
};

// Lightweight SVG area chart with gradient fill below the line
const MiniLineChart: React.FC<{ data: number[]; color: string; }> = ({ data, color }) => {
    const width = 150;
    const height = 60;
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);

    // Calculate points for the line
    const points = data.map((point, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((point - minVal) / (maxVal - minVal || 1)) * height;
        return { x, y };
    });

    // Create the area path (line + bottom edge)
    const areaPath = [
        `M ${points[0].x},${height}`, // Start at bottom left
        ...points.map(p => `L ${p.x},${p.y}`), // Line through points
        `L ${points[points.length - 1].x},${height}`, // Down to bottom right
        'Z' // Close path
    ].join(' ');

    // Create the line path
    const linePath = [
        `M ${points[0].x},${points[0].y}`,
        ...points.slice(1).map(p => `L ${p.x},${p.y}`)
    ].join(' ');

    const gradientId = `mini-line-gradient-${color.replace('#', '')}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16" preserveAspectRatio="none">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d={areaPath}
                fill={`url(#${gradientId})`}
                stroke="none"
            />
            <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// --- MAIN CARD COMPONENTS --- //

const ResolvedCasesCard = () => {
    const percentage = 87;
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <DataCard className="w-full max-w-56 h-fit flex flex-col items-center justify-center space-y-4 bg-primary text-white">
            <p className="text-brand-text-secondary text-sm font-medium uppercase w-full">Analysis <br/> Complete</p>
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                        className="text-gray-300/10"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className="text-cyan-400"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-brand-text-primary">{percentage}%</span>
                    <ChangeIndicator type="cyan" value="1.3%" />
                </div>
            </div>
        </DataCard>
    );
};

const InProgressCard = () => {
    const percentage = 63;
    return (
        <DataCard className="w-full bg-primary text-white">
            <div className="flex items-center justify-between space-x-4">
                <p className="text-brand-text-secondary text-sm font-medium uppercase">Active <br/> Analysis</p>
                <span className="text-3xl font-bold text-brand-text-primary">{percentage}%</span>
            </div>
            <div className="mt-3 flex items-baseline space-x-4">
                <div className="w-full bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </DataCard>
    );
};

const TotalDetectionsCard = () => (
    <DataCard className="w-full bg-primary text-white">
        <p className="text-brand-text-secondary text-sm font-medium uppercase ">Total <br/> Detections</p>
        <MiniLineChart data={[15, 20, 40, 30, 50, 50, 60]} color="#AAFFAA" />
        <div className="flex items-end justify-between">
            <span className=" pt-3 text-3xl font-bold text-brand-text-primary">4.2M</span>
            <ChangeIndicator type="up" value="5.7%" />
        </div>
    </DataCard>
);


const PendingQueueCard = () => (
    <DataCard className="w-full bg-primary">
        <p className="text-brand-text-secondary text-sm font-medium uppercase tracking-wider">Pending Queue</p>
        <MiniLineChart data={[60, 55, 58, 45, 50, 40, 35]} color="#f472b6" />
        <div className="flex justify-end">
            <ChangeIndicator type="down" value="3.2%" />
        </div>
    </DataCard>
);

// --- MAIN EXPORTED COMPONENT --- //

const ScalabilitySection = () => {
    return (
        <div className=" w-full h-full max-w-6xl relative ">
            <div className="flex flex-wrap items-center justify-center py-16 gap-1 bg-gradient-to-r backdrop-blur-xl z-10 relative">
                {/* Large card taking up 2 columns on larger screens */}
                <div className="flex flex-col ">
                    <ResolvedCasesCard />
                </div>

                {/* Stacked cards in the middle column */}
                <div className="flex flex-col gap-1 ">
                    <InProgressCard />
                    <TotalDetectionsCard />
                </div>

                {/* Final card in its own column */}
                {/* <div className="flex">
                    <PendingQueueCard />
                </div> */}
            </div>
        </div>
    );
};

export default ScalabilitySection;