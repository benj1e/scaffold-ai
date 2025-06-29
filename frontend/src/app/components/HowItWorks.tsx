"use client";

import { Lightbulb, ListChecks, Rocket, RotateCcw } from "lucide-react";
import Orbs from "./Orbs";

const steps = [
    {
        icon: <Lightbulb size={48} className="text-purple-400 mb-4" />,
        title: "Prompt It",
        description: "Describe your desired project stack and features in natural language. e.g., “A task manager with login, PostgreSQL DB, and a REST API”",
    },
    {
        icon: <ListChecks size={48} className="text-blue-400 mb-4" />,
        title: "Preview It",
        description: "Review the generated file structure and code snippets. Visualize your project before you commit.",
    },
    {
        icon: <Rocket size={48} className="text-green-400 mb-4" />,
        title: "Generate It",
        description: "Accept the structure and instantly scaffold your project. Download, deploy, or open in your cloud IDE.",
    },
    {
        icon: <RotateCcw size={48} className="text-yellow-400 mb-4" />,
        title: "Iterate Freely",
        description: "Need changes? Update your prompt to add features, modify the database, or scaffold new routes.",
    },
];

const HowItWorks = () => {
    return (
        <section className="pb-8 md:pb-24 bg-black font-geist relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        How Scafold AI Works
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                        Transform your ideas into code with a simple, intuitive process.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/40 p-6 rounded-xl shadow-xl hover:shadow-purple-500/30 transition-shadow duration-300 flex flex-col items-center text-center"
                        >
                            {step.icon}
                            <h3 className="text-2xl font-semibold text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
