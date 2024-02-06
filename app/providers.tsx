"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SnackbarProvider autoHideDuration={2000}>
            <NextUIProvider>{children}</NextUIProvider>
        </SnackbarProvider>
    );
}
