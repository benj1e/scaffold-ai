import React from "react";
import Hero from "./components/hero";

const Page = () => {
    return (
        <div className="flex flex-col ">
            <div className="h-screen max-w-7xl mx-auto">
                <Hero />
            </div>
        </div>
    );
};

export default Page;
