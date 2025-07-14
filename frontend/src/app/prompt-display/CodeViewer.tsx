"use client";

import React from "react";
import Editor from "@monaco-editor/react";

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
            <div className="flex-grow rounded-b-md overflow-hidden">
                <Editor
                    height="100%"
                    language={fileName?.split('.').pop() || 'plaintext'}
                    value={code || ''}
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: "on",
                        glyphMargin: false,
                        folding: true,
                        lineDecorationsWidth: 10,
                        lineNumbersMinChars: 3,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeViewer;
