"use client";

import { Instances } from "@/init";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Init() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Instances.loadApp().then(() => setIsLoaded(true));
    }, []);

    return (
        <>
            {!isLoaded && (
                <div
                    className="position-absolute top-0 start-0 vw-100 vh-100 bg-white d-flex justify-content-center align-items-center"
                    style={{ zIndex: 9999 }}>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
        </>
    );
}
