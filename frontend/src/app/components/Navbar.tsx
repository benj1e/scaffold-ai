"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react"; // Using Sparkles as a placeholder logo icon

const Navbar = () => {
    return (
        <nav className="bg-white/5 backdrop-blur-md shadow-lg sticky top-0 z-50 w-full font-geist">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center text-white hover:text-purple-400 transition-colors">
                            <Sparkles className="h-8 w-8 mr-2 text-purple-500" />
                            <span className="font-semibold text-xl">Scafold AI</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/docs"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Docs
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden">
                        {/* Mobile menu button (optional, for future enhancement) */}
                        {/* <button className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
