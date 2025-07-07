export default function Deepfake_Detection_Media() {
    return (
        <div className=" flex items-center  gap-5  px-4 py-4 w-full h-full max-w-lg xl:max-w-3xl">

            <img
                src="/features/face_scan.gif"
                alt="Deepfake Detection Animation"
                className=" w-64 aspect-auto rounded-2xl shadow-lg relative -top-20 "
            />

            <div className=" w-64 aspect-auto relative top-20 rounded-3xl shadow-lg bg-slate-100 overflow-hidden">
                <div className="absolute bg-gradient-to-r from-white/10 via-transparent to-white/10 h-full w-full "/>
                <div className="absolute bg-gradient-to-b from-primary/50 via-transparent to-white h-full w-full "/>
                <img
                    src="/features/audio_waveform.gif"
                    alt="Deepfake Detection Animation"
                    className="w-full max-w-lg  "
                />
            </div>

        </div>
    );
}