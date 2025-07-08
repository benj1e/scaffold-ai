"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import AnimatedBackground from "./background";
import { Sparkles } from "lucide-react";
import api from "@/api/config";
import axios, { AxiosRequestConfig } from "axios";

const Hero = () => {
    const [prompt, setPrompt] = useState<string>("");
    const router = useRouter(); // Initialize useRouter

    const sendMyPrompt = async (): Promise<string | null> => {
        try {
            const response = await api.post("/prompt/", {
                content: prompt,
            });
            const responseId = response.data["id"];
            return responseId;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error details:", error.response?.data);
            } else {
                console.log("An unexpected error occurred:", error);
            }
            return null;
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            console.log("Prompt is empty or just whitespace.");
            return;
        }

        const promptId = await sendMyPrompt();
        if (promptId) {
            router.push(
                `/prompt-display?prompt=${encodeURIComponent(promptId)}`
            );
        }
    };

    return (
        <>
            <div className="flex flex-col items-center h-fit w-full z-10">
                {/* Intro */}
                {/* Adjusted mt-12 (from mt-20) and mb-12 (from mb-15) */}
                <div className="flex flex-col items-center justify-center mt-12 mb-12 w-full max-w-4xl">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-geist my-4 text-center text-white">
                        Scaffold your project with a{" "}
                        <span className="font-playfair-display italic bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                            prompt.
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl w-full font-ibm-plex-sans text-gray-400 text-center max-w-2xl my-auto mt-4">
                        Skip setups, configs, and boilerplate. Generate
                        full-stack app structures instantly.
                    </p>
                </div>
                {/* Input */}
                <div className="w-full flex justify-center px-4 py-8 font-geist">
                    <div className="relative w-full max-w-2xl">
                        {" "}
                        {/* Max width slightly reduced for tighter focus */}
                        {/* Gradient border effect can be enhanced */}
                        <div className="p-0.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:shadow-2xl hover:shadow-pink-500/50 transition-shadow duration-300">
                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center rounded-[14px] bg-gray-900/80 backdrop-blur-sm" // Darker background for input area
                            >
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setPrompt(e.target.value)}
                                    placeholder="e.g., A Next.js app with Tailwind, TypeScript, and a FastAPI backend..."
                                    className="w-full p-5 pr-16 text-lg rounded-l-[14px] bg-transparent text-white placeholder:text-gray-500 outline-none focus:ring-0 border-none"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-5 text-white hover:text-pink-400 transition-colors duration-200 rounded-r-[14px]"
                                    aria-label="Submit Prompt"
                                    // onSubmit is on the form, not needed here
                                >
                                    <Sparkles size={24} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <p className="text-center text-gray-500 text-sm mt-8 font-ibm-plex-sans">
                    Get started quickly. Your AI-powered scaffolding assistant.
                </p>
            </div>
            <AnimatedBackground />
        </>
    );
};

export default Hero;
