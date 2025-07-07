// import Deepfake_Detection_Media from "@/components/animated_media/deepfake_detection";
// import MisinformationGuard from "@/components/animated_media/misinformation_guard";
import Content_Filter from "@/components/animated_media/content_filter";

export default function TestPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold">Test Page</h1>
            <p className="mt-4">This is a test page.</p>
            {/* <MisinformationGuard /> */}
            <Content_Filter />
            {/* <Deepfake_Detection_Media /> */}
        </div>
    );
}
