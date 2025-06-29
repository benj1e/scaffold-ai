"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import AnimatedBackground from "@/app/ui/background";
import { Sparkles } from "lucide-react";

const Hero = () => {
    const [prompt, setPrompt] = useState<string>("");
    const router = useRouter(); // Initialize useRouter

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!prompt.trim()) {
            // Optionally, provide user feedback here (e.g., set an error state)
            console.log("Prompt is empty or just whitespace.");
            return;
        }
        // Navigate to the new page with the prompt as a query parameter
        router.push(`/prompt-display?prompt=${encodeURIComponent(prompt)}`);
        // It's generally better not to clear the prompt here,
        // in case the user wants to quickly modify and resubmit from the new page (though current setup doesn't support that directly)
        // setPrompt("");
    }

    return (
        <div className="flex flex-col items-center h-fit w-full my-20">
            {/* Intro */}
            <div className="flex flex-col items-center justify-center mt-20 mb-15 w-6xl max-w-full ">
                <h1 className="text-6xl font-geist my-4 text-center">
                    Scaffold your project with a{" "}
                    <span className="font-playfair-display italic bg-gradient-to-r text-7xl from-blue-800 to-purple-800 text-transparent bg-clip-text">
                        prompt.
                    </span>
                </h1>
                <span className="text-2xl w-full font-ibm-plex-sans text-gray-500 text-center max-w-2xl my-auto">
                    Skip setups, configs and generate app structures from a prompt
                </span>
            </div>
            {/* Input */}
            <div className="w-full flex justify-center px-4 py-6 font-geist">
                <div className="relative w-full max-w-3xl">
                    {/* Gradient border wrapper */}
                    <div className="p-[2px] rounded-2xl">
                        {/* Actual input field */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center"
                        >
                            {" "}
                            {/* Wrap input and button in a form */}
                            <input
                                type="text"
                                value={prompt}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setPrompt(e.target.value)} // Explicitly type the event
                                placeholder="Enter a prompt..."
                                className="w-full p-4 pr-12 rounded-[14px] bg-white/10 backdrop-blur border-none text-white placeholder:text-white/60 outline-none"
                            />
                            {/* Clickable Sparkles icon as button */}
                            <button
                                type="submit" // Set type to submit for form submission
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                aria-label="Submit Prompt"
                                onSubmit={handleSubmit} // Handle form submission
                            >
                                <Sparkles size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <AnimatedBackground />
        </div>
    );
};

export default Hero;
