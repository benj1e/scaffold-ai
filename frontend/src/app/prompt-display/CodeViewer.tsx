"use client";

import React from "react";

interface CodeViewerProps {
    fileName: string | null;
    code: string | null;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ fileName, code }) => {
    if (!fileName) {
        return (
            <div className="p-6 bg-gray-800/50 rounded-lg h-full flex flex-col items-center justify-center text-gray-500">
                <span className="text-lg">Select a file to view its content.</span>
            </div>
        );
    }

    return (
        <div className="p-2 bg-gray-800/50 rounded-lg h-full flex flex-col">
            <div className="bg-gray-700/60 p-3 rounded-t-md">
                <h3 className="text-md font-semibold text-white">{fileName}</h3>
            </div>
            <pre className="p-4 text-sm text-gray-200 whitespace-pre-wrap break-all overflow-y-auto custom-scrollbar flex-grow bg-gray-900/70 rounded-b-md">
                {code || "// This file is empty or content is not available."}
            </pre>
        </div>
    );
};

export default CodeViewer;
