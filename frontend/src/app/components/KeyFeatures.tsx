"use client";

import React from "react";

// Assuming lucide-react is installed. If not: npm install lucide-react
import { TerminalSquare, Zap, Layers, Container } from "lucide-react";

// Centralized features data
const features = [
    {
        icon: <TerminalSquare size={36} className="text-purple-400" />,
        title: "Prompt-to-Project",
        description:
            "Describe your app, and Scafold AI generates the complete boilerplate and structure.",
    },
    {
        icon: <Zap size={36} className="text-blue-400" />,
        title: "AI File Generator",
        description:
            "Intelligent code generation for common files like auth, DB connections, and API routes.",
    },
    {
        icon: <Layers size={36} className="text-indigo-400" />,
        title: "Framework Agnostic",
        description:
            "Supports Next.js, FastAPI, Django, Flask, Express, and more. Pick your favorite stack.",
    },
    {
        icon: <Container size={36} className="text-sky-400" />,
        title: "Container Ready",
        description:
            "Optionally containerize your new application from the get-go for easy deployment.",
    },
];

// Main KeyFeatures Component
export default function KeyFeatures() {
    return (
        <section className="relative w-full py-20 md:py-28 bg-black font-geist overflow-hidden">
            {/* Background Glows */}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        What makes{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                            Scafold AI? {" "}
                        </span>
                        dihfferent
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
                        Focus on building, not boilerplate. We accelerate your
                        development from idea to deployment.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            // Card container: borderless, with padding and hover effects
                            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-purple-500/10 hover:-translate-y-1"
                        >
                            {/* Icon at the top-left */}
                            <div className="mb-5">{feature.icon}</div>
                            {/* Text content */}
                            <h3 className="text-xl font-bold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-base leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
