"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Download, GitHub, Edit3, MessageSquareText, Loader2 } from "lucide-react";
import FileTree from "./FileTree";
import CodeViewer from "./CodeViewer";
import { mockFileStructure, FileNode, findFileById } from "./mockData";
import Notification from "../components/Notification"; // Import Notification component

// Styles for custom scrollbar (if not already in globals.css)
// You might want to add this to globals.css for wider use:
// .custom-scrollbar::-webkit-scrollbar { width: 8px; }
// .custom-scrollbar::-webkit-scrollbar-track { background: #2d3748; border-radius: 4px; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 4px; }
// .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #718096; }

interface AppNotification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

const PromptDisplayContent = () => {
    const searchParams = useSearchParams();
    const prompt = searchParams.get("prompt");

    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSelectFile = (fileId: string) => {
        const file = findFileById(mockFileStructure, fileId);
        if (file && file.type === 'file') {
            setSelectedFileId(fileId);
            setSelectedFile(file);
        } else {
            setSelectedFileId(null);
            setSelectedFile(null);
        }
    };

    const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
        const newNotification = { id: Date.now(), message, type };
        setNotifications(prev => [...prev, newNotification]);
    };

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleDownload = () => {
        addNotification("Preparing download...", "info");
        // Simulate download process
        setTimeout(() => {
            // Remove the "Preparing download..." notification if desired, or let it auto-dismiss
            // For this example, we'll assume auto-dismissal or manual close by user handles it.
            addNotification("Project ZIP download started! (Mock)", "success");
        }, 1500);
    };

    const handlePublishToGitHub = () => {
        addNotification("Connecting to GitHub...", "info");
        setTimeout(() => {
            // Simulate success or failure randomly for more realism, or just success for now
            const isSuccess = Math.random() > 0.2; // 80% chance of success
            if (isSuccess) {
                addNotification("Authenticating with GitHub...", "info");
                setTimeout(() => {
                    addNotification("Creating repository...", "info");
                    setTimeout(() => {
                        addNotification("Pushing code to new repository...", "info");
                        setTimeout(() => {
                            addNotification("Project published to GitHub successfully! (Mock)", "success");
                        }, 2000);
                    }, 1500);
                }, 1500);
            } else {
                addNotification("Failed to connect to GitHub. (Mock Error)", "error");
            }
        }, 2000);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-geist flex flex-col p-4 md:p-6 pt-0">
            {/* Notifications will now position themselves individually */}
            {notifications.map(notif => (
                <Notification
                    key={notif.id}
                        message={notif.message}
                        type={notif.type}
                        onClose={() => removeNotification(notif.id)}
                    />
                ))}
            </div>

            {/* Top Bar: Prompt and Global Actions */}
            <header className="mb-4 p-4 bg-gray-800/40 backdrop-blur-md rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                    <MessageSquareText className="h-6 w-6 text-purple-400 mr-3 flex-shrink-0" />
                    <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 truncate">
                        Prompt:
                    </h1>
                    <p className="text-gray-300 ml-2 truncate text-sm md:text-base">
                        {prompt || "No prompt provided."}
                    </p>
                </div>
                <div className="flex items-center justify-start space-x-3 mt-3">
                    <button
                        className="flex items-center bg-green-500/80 hover:bg-green-600/90 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-md disabled:opacity-50"
                        disabled={isLoading}
                        onClick={handleDownload}
                    >
                        <Download size={16} className="mr-2" />
                        Download Project
                    </button>
                    <button className="flex items-center bg-gray-600/80 hover:bg-gray-700/90 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-md disabled:opacity-50"
                        disabled={isLoading}
                        onClick={() => addNotification("Simulating publish to GitHub...", "info")}
                    >
                        <GitHub size={16} className="mr-2" />
                        Publish to GitHub
                    </button>
                    <button className="flex items-center bg-blue-500/80 hover:bg-blue-600/90 text-white px-4 py-2 rounded-md text-sm transition-colors shadow-md disabled:opacity-50"
                        disabled={isLoading}
                        onClick={() => addNotification("Structure modification UI not yet implemented.", "info")}
                    >
                        <Edit3 size={16} className="mr-2" />
                        Modify Structure
                    </button>
                </div>
            </header>

            {/* Main Content: File Tree and Code Viewer */}
            {isLoading ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-10 bg-gray-800/30 rounded-lg">
                    <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
                    <p className="text-xl text-gray-300">Generating your project structure...</p>
                    <p className="text-gray-500">Please wait a moment.</p>
                </div>
            ) : (
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[60vh]"> {/* Ensure minimum height for layout */}
                    {/* File Tree Panel */}
                    <div className="md:col-span-1 lg:col-span-1 h-full min-h-[300px] md:min-h-0"> {/* min-h for mobile */}
                        <FileTree
                            nodes={mockFileStructure}
                            onSelectFile={handleSelectFile}
                            selectedFileId={selectedFileId}
                            addNotification={addNotification} // Pass addNotification down
                        />
                    </div>

                    {/* Code Viewer Panel */}
                    <div className="md:col-span-2 lg:col-span-3 h-full min-h-[400px] md:min-h-0"> {/* min-h for mobile */}
                        <CodeViewer fileName={selectedFile?.name || null} code={selectedFile?.content || null} />
                    </div>
                </div>
            )}
        </div>
    );
};

const PromptPage = () => {
    return (
        // The page itself doesn't need top padding if the layout component handles it via Navbar height
        // The main content of PromptDisplayContent will now handle its own padding
        <Suspense fallback={
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-white bg-black">
                <Loader2 size={40} className="animate-spin text-purple-500" />
                <p className="mt-3 text-lg">Loading Prompt Details...</p>
            </div>
        }>
            <PromptDisplayContent />
        </Suspense>
    );
};

export default PromptPage;
