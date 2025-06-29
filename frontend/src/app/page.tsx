import React from "react";
import Hero from "./components/hero";
import HowItWorks from "./components/HowItWorks";
import KeyFeatures from "./components/KeyFeatures";
import SupportedTechnologies from "./components/SupportedTechnologies";
import Orbs from "./components/Orbs";
// import CallToAction from "./components/CallToAction"; // Optional: if we create a separate CTA section

const Page = () => {
    return (
        <div className="flex flex-col bg-black">
            {/* Hero section takes roughly the screen height, but other content will follow */}
            <div className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto w-full px-4 mb-8">
                <Hero />
            </div>
            <Orbs orbs={[{ position: { top: "50%" } }]} />
            <Orbs
                orbs={[{ position: { top: "30%", right: 0 }, color: "pink" }]}
            />
            <Orbs
                orbs={[
                    { position: { top: "75%", left: "20%" }, color: "orange" },
                ]}
            />

            {/* Other sections */}
            <HowItWorks />
            <KeyFeatures />
            <SupportedTechnologies />

            {/* Optional: A final Call To Action section if needed */}
            {/* <CallToAction /> */}

            {/* Footer placeholder - can be developed as a separate component */}
            <footer className="py-8 bg-gray-900/50 text-center text-gray-500 font-geist">
                <p>
                    &copy; {new Date().getFullYear()} Scafold AI. All rights
                    reserved.
                </p>
                {/* Add social links or other footer content here */}
            </footer>
        </div>
    );
};

export default Page;
