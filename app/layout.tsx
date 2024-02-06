import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./colors.css";
import Init from "./_shared/components/commun/init";
import StoreProvider from "./storeProvider";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tuzzo Shop",
    description: "Votre boutique en ligne",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Providers>
                        <Init></Init>
                        <div className="vh-100 vw-100">{children}</div>
                    </Providers>
                </body>
            </html>
        </StoreProvider>
    );
}
