import "@/app/globals.css";
import Blob from "./blob";

// Animated Background Component using only Tailwind
const AnimatedBackground = () => {
    return (
        <div className="absolute h-screen inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-black" />
            <div className="streak-1"></div>

            {/* Animated streaks using Tailwind */}
            <div className="absolute inset-0">
                {/* Diagonal light streaks */}
                <div className="absolute top-0 left-1/4 w-0.25 h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent transform rotate-12 animate-pulse" />
                <div className="absolute top-0 left-1/2 w-0.25 h-full bg-gradient-to-b from-transparent via-indigo-400/25 to-transparent transform rotate-0 animate-pulse delay-2000" />
                <div className="absolute top-0 right-1/4 w-0.25 h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent transform -rotate-12 animate-pulse delay-500" />

                {/* Horizontal light streaks */}
                <div className="absolute top-1/4 left-0 h-0.25 w-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse delay-1500" />
                <div className="absolute top-3/4 left-0 h-0.25 w-full bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-pulse delay-3000" />
                <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-300/10 to-transparent animate-pulse delay-4000" />
            </div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-ping delay-0" />
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-ping delay-1000" />
                <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping delay-2000" />
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping delay-3000" />
                <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-ping delay-4000" />
                <div className="absolute top-1/6 right-1/2 w-1 h-1 bg-blue-300/40 rounded-full animate-ping delay-5000" />
            </div>

            {/* Large background blobs */}
            <div className="absolute -top-40 -left-40 opacity-20">
                <Blob
                    color="custom"
                    size={500}
                    opacity={0.5}
                    customGradient={{
                        from: "#3b82f6",
                        via: "#8b5cf6",
                        to: "#1e40af",
                    }}
                />
            </div>

            <div className="absolute top-1/4 -right-60 opacity-20">
                <Blob
                    color="custom"
                    size={800}
                    opacity={0.9}
                    customGradient={{
                        from: "#a855f7",
                        via: "#6366f1",
                        to: "#4f46e5",
                    }}
                />
            </div>

            <div className="absolute -bottom-60 left-1/3 opacity-18">
                <Blob
                    color="custom"
                    size={700}
                    opacity={0.28}
                    customGradient={{
                        from: "#06b6d4",
                        via: "#3b82f6",
                        to: "#1d4ed8",
                    }}
                />
            </div>

            <div className="absolute top-1/2 left-1/4 opacity-12">
                <Blob
                    color="custom"
                    size={400}
                    opacity={0.2}
                    customGradient={{
                        from: "#f59e0b",
                        via: "#f97316",
                        to: "#ea580c",
                    }}
                />
            </div>

            <div className="absolute top-20 right-1/4 opacity-15">
                <Blob
                    color="custom"
                    size={300}
                    opacity={0.25}
                    customGradient={{
                        from: "#ec4899",
                        via: "#d946ef",
                        to: "#c026d3",
                    }}
                />
            </div>

            {/* Additional atmospheric effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-black/20" />
        </div>
    );
};

export default AnimatedBackground;
