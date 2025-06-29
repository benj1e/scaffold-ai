"use client";

// Using simple text as placeholders for logos for now.
// In a real scenario, you'd use actual SVG logos or icon components.
const technologies = [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "FastAPI", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Flask", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Docker", category: "Deployment" },
];

const SupportedTechnologies = () => {
    return (
        <section className="py-16 md:py-24 bg-black font-geist">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Versatile & Future-Proof
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                        Build with the technologies you love. Scafold AI is designed to be broadly compatible.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/60 text-gray-300 px-5 py-3 rounded-lg shadow-md hover:bg-purple-600/50 hover:text-white transition-all duration-300 text-center"
                        >
                            <span className="text-md font-medium">{tech.name}</span>
                            {/* <span className="block text-xs text-purple-400">{tech.category}</span> */}
                        </div>
                    ))}
                </div>
                <p className="text-center text-gray-500 mt-10 text-sm">
                    And many more coming soon...
                </p>
            </div>
        </section>
    );
};

export default SupportedTechnologies;
