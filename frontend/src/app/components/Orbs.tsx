import React from "react";

interface BlurryOrbProps {
    size?: number | string;
    color?: string;
    position?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
    };
    blur?: number;
    opacity?: number;
    animate?: boolean;
    animationDelay?: number;
    animationDuration?: number;
    className?: string;
}

interface OrbsProps {
    orbs?: BlurryOrbProps[];
    className?: string;
}

const BlurryOrb: React.FC<BlurryOrbProps> = ({
    size = 320,
    color = "purple",
    position = { top: "-20%", left: "-20%" },
    blur = 120,
    opacity = 0.3,
    animate = true,
    animationDelay = 0,
    animationDuration = 4000,
    className = "",
}) => {
    const sizeValue = typeof size === "number" ? `${size}px` : size;

    const positionStyles: React.CSSProperties = {};
    if (position.top !== undefined) {
        positionStyles.top =
            typeof position.top === "number"
                ? `${position.top}px`
                : position.top;
    }
    if (position.bottom !== undefined) {
        positionStyles.bottom =
            typeof position.bottom === "number"
                ? `${position.bottom}px`
                : position.bottom;
    }
    if (position.left !== undefined) {
        positionStyles.left =
            typeof position.left === "number"
                ? `${position.left}px`
                : position.left;
    }
    if (position.right !== undefined) {
        positionStyles.right =
            typeof position.right === "number"
                ? `${position.right}px`
                : position.right;
    }

    // Color mapping for common colors
    const colorMap: { [key: string]: string } = {
        purple: "#8b5cf6",
        blue: "#3b82f6",
        green: "#10b981",
        pink: "#ec4899",
        yellow: "#f59e0b",
        red: "#ef4444",
        indigo: "#6366f1",
        cyan: "#06b6d4",
        orange: "#f97316",
        emerald: "#059669",
        violet: "#7c3aed",
        rose: "#f43f5e",
    };

    const backgroundColor = colorMap[color] || color;

    return (
        <div
            className={`absolute rounded-full pointer-events-none ${
                animate ? "animate-pulse" : ""
            } ${className}`}
            style={{
                width: sizeValue,
                height: sizeValue,
                backgroundColor,
                filter: `blur(${blur}px)`,
                opacity,
                animationDelay: `${animationDelay}ms`,
                animationDuration: `${animationDuration}ms`,
                ...positionStyles,
            }}
        />
    );
};

const Orbs: React.FC<OrbsProps> = ({
    orbs = [
        {
            size: 320,
            color: "purple",
            position: { top: "-10%", left: "-10%" },
            animationDelay: 0,
        },
        {
            size: 280,
            color: "blue",
            position: { bottom: "-10%", right: "-10%" },
            animationDelay: 1000,
        },
        {
            size: 240,
            color: "emerald",
            position: { top: "50%", left: "50%" },
            animationDelay: 2000,
        },
    ],
    className = "",
}) => {
    return (
        <div className={`absolute inset-0 overflow-hidden z-10 pointer-events-none ${className}`}>
            {orbs.map((orb, index) => (
                <BlurryOrb key={index} {...orb} />
            ))}
        </div>
    );
};

export default Orbs;
