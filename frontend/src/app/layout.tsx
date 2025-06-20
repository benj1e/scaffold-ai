import type { Metadata } from "next";
import { Sora, Rubik } from "next/font/google";
import "./globals.css";

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});

const rubik = Rubik({
    subsets: ["latin"],
    variable: "--font-rubik",
});

export const metadata: Metadata = {
    title: "Scaffold AI",
    description: "Scaffold AI is a platform for generating project structures with ease and speed.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${sora.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
