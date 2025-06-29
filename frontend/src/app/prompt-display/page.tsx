"use client";

import React, { Suspense } from "react"; // Import Suspense
import { useSearchParams } from "next/navigation";
import { Terminal, Brain, MessageSquareText } from "lucide-react";

// A separate component to handle search params, allowing Suspense boundary
const PromptDisplayContent = () => {
    const searchParams = useSearchParams();
    const prompt = searchParams.get("prompt");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-geist py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Prompt Display Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 mb-12">
                    <div className="flex items-center mb-4">
                        <MessageSquareText className="h-8 w-8 text-purple-400 mr-3" />
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            Your Prompt
                        </h1>
                    </div>
                    {prompt ? (
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {prompt}
                        </p>
                    ) : (
                        <p className="text-lg text-gray-500">
                            No prompt provided. Try entering one on the home page!
                        </p>
                    )}
                </div>

                {/* Placeholder for FastAPI Backend Response */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8">
                    <div className="flex items-center mb-6">
                        <Brain className="h-8 w-8 text-green-400 mr-3" />
                        <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            AI Generated Structure
                        </h2>
                    </div>
                    <div className="bg-black/50 p-6 rounded-lg min-h-[200px] flex items-center justify-center">
                        <div className="text-center">
                            <Terminal className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">
                                Future AI response will appear here...
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                                (This is where the generated file structure or code snippets will be shown)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// The actual page component that uses Suspense
const PromptPage = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-white">Loading prompt...</div>}>
            <PromptDisplayContent />
        </Suspense>
    );
};

export default PromptPage;
