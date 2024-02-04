"use client";

import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "@/public/css/components/custom-image.css";

export function CustomImage({
    url,
    name,
    width,
    height,
    hAuto,
    wAuto,
    containerClass,
    fitContain,
}: {
    url: string;
    name: string;
    width?: string;
    height?: string;
    hAuto?: boolean;
    wAuto?: boolean;
    containerClass?: string;
    fitContain?: boolean;
}) {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    return (
        <div
            className={`position-relative ${
                hAuto
                    ? "custom-image-auto-height"
                    : wAuto
                    ? "custom-image-auto-width"
                    : "custom-image-full"
            } ${containerClass ?? ""} ${
                fitContain ? "custom-image-fit-contain" : ""
            }`}
            style={{ width, height }}>
            <Image
                src={url}
                alt={name}
                className="rounded-3"
                loading="lazy"
                onLoad={handleImageLoad}
                fill></Image>
            {!isImageLoaded && <Skeleton height="100%" />}
        </div>
    );
}
