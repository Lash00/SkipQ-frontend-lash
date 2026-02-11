import Lottie from "lottie-react";
import Error404 from "../../assets/lottie/Error404.json";

function PageNotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Lottie animationData={Error404} loop={true} />
        </div>
    )
}

export default PageNotFound;
