import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#000000"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}
