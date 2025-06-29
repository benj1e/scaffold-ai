"use client";

import { TerminalSquare, Zap, Layers, Docker } from "lucide-react";

const features = [
    {
        icon: <TerminalSquare size={32} className="text-green-400" />,
        title: "Prompt-to-Project",
        description: "Describe your app, and Scafold AI generates the complete boilerplate and structure.",
    },
    {
        icon: <Zap size={32} className="text-yellow-400" />,
        title: "AI File Generator",
        description: "Intelligent code generation for common files like auth, DB connections, and API routes.",
    },
    {
        icon: <Layers size={32} className="text-blue-400" />,
        title: "Framework Agnostic",
        description: "Supports Next.js, FastAPI, Django, Flask, Express, and more. Pick your favorite stack.",
    },
    {
        icon: <Docker size={32} className="text-sky-400" />,
        title: "Docker Ready",
        description: "Optionally containerize your new application from the get-go for easy deployment.",
    },
];

const KeyFeatures = () => {
    return (
        <section className="py-16 md:py-24 bg-gray-900/70 font-geist">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Why Choose Scafold AI?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                        Focus on building, not boilerplate. Here’s how we accelerate your development.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-start p-6 bg-gray-800/50 rounded-lg shadow-lg hover:bg-gray-700/60 transition-colors duration-300"
                        >
                            <div className="flex-shrink-0 mr-4 mt-1">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
