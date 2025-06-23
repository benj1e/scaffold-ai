import type { Metadata } from "next";
import { Geist, Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
});

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
});

export const metadata: Metadata = {
    title: "Scaffold AI",
    description:
        "Scaffold AI is a platform for generating project structures with ease and speed.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${ibmPlexSans.variable} ${playfairDisplay.variable} ${geist.variable} antialiased bg-black text-white min-h-screen relative overflow-x-hidden`}
            >
                {/* Content wrapper */}
                <div className="relative z-10">
                    <main className="relative">{children}</main>
                </div>
            </body>
        </html>
    );
}
