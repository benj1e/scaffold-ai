"use client";

import React, { useEffect, useRef } from "react";

const BLOB_POOL = [
    "M23,-36.8C29.8,-31.5,35.1,-25,45.5,-16.6C55.9,-8.1,71.3,2.2,72.3,12C73.4,21.8,60,31.1,47.7,36.3C35.4,41.5,24.1,42.5,12.8,47.7C1.5,52.9,-9.7,62.2,-21.5,63.3C-33.2,64.3,-45.5,57.2,-50.8,46.5C-56.2,35.9,-54.7,21.8,-58.3,7.4C-61.9,-7,-70.7,-21.7,-66.7,-30.4C-62.6,-39.2,-45.7,-42,-32.5,-44.3C-19.2,-46.7,-9.6,-48.6,-0.7,-47.4C8.1,-46.3,16.3,-42.2,23,-36.8Z",
    "M35.6,-48.2C50.5,-38.2,70,-33.6,77.7,-22.3C85.4,-11,81.4,7.1,71.7,19.1C62,31.2,46.7,37.2,33.9,46.1C21,55,10.5,66.7,-1.5,68.7C-13.4,70.8,-26.9,63.1,-39.1,54C-51.3,44.9,-62.2,34.4,-66.1,21.7C-69.9,9,-66.7,-5.8,-62.8,-21.2C-58.9,-36.6,-54.3,-52.5,-43.7,-64C-33.2,-75.4,-16.6,-82.4,-3.1,-78.1C10.4,-73.8,20.7,-58.3,35.6,-48.2Z",
    "M32.6,-49.4C40.6,-39.1,44.1,-27.3,48.1,-15.5C52.1,-3.7,56.5,8.1,54.8,19.1C53,30.2,45,40.6,34.9,53.6C24.7,66.6,12.3,82.2,-2,84.9C-16.3,87.7,-32.6,77.5,-46.9,65.8C-61.2,54.2,-73.5,41,-75.2,26.6C-76.9,12.2,-67.9,-3.5,-59.9,-16.8C-52,-30.2,-45,-41.3,-35.2,-50.9C-25.4,-60.5,-12.7,-68.7,-0.2,-68.4C12.3,-68.2,24.7,-59.6,32.6,-49.4Z",
    "M39.9,-51.5C53.2,-45.3,66.5,-35.6,74.6,-21.7C82.6,-7.8,85.3,10.4,79.6,25.2C73.8,39.9,59.6,51.2,44.9,56C30.2,60.8,15.1,59.2,2.2,56.1C-10.7,53.1,-21.3,48.6,-33.2,42.8C-45.1,37.1,-58.3,30.1,-68.4,17.8C-78.6,5.4,-85.7,-12.4,-79.5,-24C-73.2,-35.7,-53.6,-41.2,-38.1,-46.7C-22.6,-52.1,-11.3,-57.6,1,-59C13.3,-60.4,26.6,-57.6,39.9,-51.5Z",
];

// Parse SVG path string into coordinates
type PathPoint =
    | { type: "M" | "L"; x: number; y: number }
    | {
          type: "C";
          x: number;
          y: number;
          cp1x: number;
          cp1y: number;
          cp2x: number;
          cp2y: number;
      }
    | { type: "Z" };

function parsePath(pathString: string) {
    const commands = pathString.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || [];
    const points: PathPoint[] = [];

    commands.forEach((command) => {
        const type = command[0];
        const coords = command
            .slice(1)
            .split(/[\s,]+/)
            .filter((n) => n)
            .map(Number);

        if (type === "M" || type === "L") {
            points.push({ x: coords[0], y: coords[1], type });
        } else if (type === "C") {
            points.push({
                x: coords[4],
                y: coords[5],
                cp1x: coords[0],
                cp1y: coords[1],
                cp2x: coords[2],
                cp2y: coords[3],
                type,
            });
        } else if (type === "Z") {
            points.push({ type: "Z" });
        }
    });

    return points;
}

// Convert points back to path string
function pointsToPath(points: PathPoint[]) {
    return points
        .map((point) => {
            if (point.type === "M") {
                return `M${point.x},${point.y}`;
            } else if (point.type === "C") {
                return `C${point.cp1x},${point.cp1y},${point.cp2x},${point.cp2y},${point.x},${point.y}`;
            } else if (point.type === "Z") {
                return "Z";
            }
            return "";
        })
        .join("");
}

// Interpolate between two sets of points
function interpolatePoints(
    points1: PathPoint[],
    points2: PathPoint[],
    t: number
) {
    const interpolated: PathPoint[] = [];

    for (let i = 0; i < Math.min(points1.length, points2.length); i++) {
        const p1 = points1[i];
        const p2 = points2[i];

        if (p1.type === "Z" || p2.type === "Z") {
            interpolated.push({ type: "Z" });
        } else if (p1.type === "M" || p2.type === "M") {
            interpolated.push({
                type: "M",
                x: p1.x + (p2.x - p1.x) * t,
                y: p1.y + (p2.y - p1.y) * t,
            });
        } else if (p1.type === "C" && p2.type === "C") {
            interpolated.push({
                type: "C",
                x: p1.x + (p2.x - p1.x) * t,
                y: p1.y + (p2.y - p1.y) * t,
                cp1x: p1.cp1x + (p2.cp1x - p1.cp1x) * t,
                cp1y: p1.cp1y + (p2.cp1y - p1.cp1y) * t,
                cp2x: p1.cp2x + (p2.cp2x - p1.cp2x) * t,
                cp2y: p1.cp2y + (p2.cp2y - p1.cp2y) * t,
            });
        }
    }

    return interpolated;
}

// Easing function for smooth animation
function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface BlobProps {
    className?: string;
    size?: number;
    opacity?: number;
    color?: "blue" | "purple" | "pink" | "green" | "orange" | "red" | "custom";
    customGradient?: {
        from: string;
        via?: string;
        to: string;
    };
}

const Blob: React.FC<BlobProps> = ({
    className = "",
    size = 400,
    opacity = 0.5,
    color = "orange",
    customGradient,
}) => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    // Predefined color schemes
    const colorSchemes = {
        blue: {
            stops: [
                { offset: "0%", color: "#dbeafe", opacity: 0.8 },
                { offset: "50%", color: "#3b82f6", opacity: 0.6 },
                { offset: "100%", color: "#1d4ed8", opacity: 0.9 },
            ],
        },
        purple: {
            stops: [
                { offset: "0%", color: "#f3e8ff", opacity: 0.8 },
                { offset: "50%", color: "#a855f7", opacity: 0.6 },
                { offset: "100%", color: "#7c3aed", opacity: 0.9 },
            ],
        },
        pink: {
            stops: [
                { offset: "0%", color: "#fdf2f8", opacity: 0.8 },
                { offset: "50%", color: "#ec4899", opacity: 0.6 },
                { offset: "100%", color: "#be185d", opacity: 0.9 },
            ],
        },
        green: {
            stops: [
                { offset: "0%", color: "#dcfce7", opacity: 0.8 },
                { offset: "50%", color: "#22c55e", opacity: 0.6 },
                { offset: "100%", color: "#15803d", opacity: 0.9 },
            ],
        },
        orange: {
            stops: [
                { offset: "0%", color: "#ffffff", opacity: 0.8 },
                { offset: "50%", color: "#fbbf24", opacity: 0.6 },
                { offset: "100%", color: "#f59e0b", opacity: 0.9 },
            ],
        },
        red: {
            stops: [
                { offset: "0%", color: "#fef2f2", opacity: 0.8 },
                { offset: "50%", color: "#ef4444", opacity: 0.6 },
                { offset: "100%", color: "#dc2626", opacity: 0.9 },
            ],
        },
        custom: {
            stops: customGradient
                ? [
                      {
                          offset: "0%",
                          color: customGradient.from,
                          opacity: 0.8,
                      },
                      ...(customGradient.via
                          ? [
                                {
                                    offset: "50%",
                                    color: customGradient.via,
                                    opacity: 0.6,
                                },
                            ]
                          : []),
                      {
                          offset: "100%",
                          color: customGradient.to,
                          opacity: 0.9,
                      },
                  ]
                : [
                      { offset: "0%", color: "#ffffff", opacity: 0.8 },
                      { offset: "50%", color: "#fbbf24", opacity: 0.6 },
                      { offset: "100%", color: "#f59e0b", opacity: 0.9 },
                  ],
        },
    };

    const currentColorScheme = colorSchemes[color];

    useEffect(() => {
        let currentIndex = 0;
        const parsedPaths = BLOB_POOL.map(parsePath);

        const animateToNext = () => {
            const startIndex = currentIndex % parsedPaths.length;
            const endIndex = (currentIndex + 1) % parsedPaths.length;

            const startPoints = parsedPaths[startIndex];
            const endPoints = parsedPaths[endIndex];

            const duration = 3000; // 3 seconds
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                const interpolatedPoints = interpolatePoints(
                    startPoints,
                    endPoints,
                    easedProgress
                );
                const newPath = pointsToPath(interpolatedPoints);

                if (pathRef.current) {
                    pathRef.current.setAttribute("d", newPath);
                }

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    currentIndex++;
                    setTimeout(animateToNext, 500); // Brief pause between animations
                }
            };

            animate();
        };

        // Start the animation cycle
        animateToNext();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <svg
            width={size}
            height={size}
            viewBox="-100 -100 200 200"
            className={`absolute drop-shadow-lg ${className}`}
            style={{ opacity }}
        >
            <path ref={pathRef} d={BLOB_POOL[0]} fill={`url(#${gradientId})`} />
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                    className="filter blur-xs"
                >
                    {currentColorScheme.stops.map((stop, index) => (
                        <stop
                            key={index}
                            offset={stop.offset}
                            stopColor={stop.color}
                            stopOpacity={stop.opacity}
                        />
                    ))}
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Blob;
