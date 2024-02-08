"use client";

import { usePathname } from "next/navigation";
import { useVisit } from "../../hooks/useVisit";
import { useEffect } from "react";

export default function VisitCounter({ storeId, productId }: { storeId: string; productId?: string }) {
    const pathname = usePathname();
    const { save } = useVisit();

    useEffect(() => {
        save(storeId, pathname, productId);
    }, [pathname]);
    return <></>;
}
