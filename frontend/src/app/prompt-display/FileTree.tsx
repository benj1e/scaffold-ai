"use client";

import React, { useState } from "react";
import { FileNode } from "./mockData";
import { Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";

interface FileTreeProps {
    nodes: FileNode[];
    onSelectFile: (fileId: string) => void;
    selectedFileId?: string | null;
}

const FileTree: React.FC<FileTreeProps> = ({ nodes, onSelectFile, selectedFileId }) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(folderId)) {
                newSet.delete(folderId);
            } else {
                newSet.add(folderId);
            }
            return newSet;
        });
    };

    const renderNode = (node: FileNode, depth: number = 0): JSX.Element => {
        const isExpanded = expandedFolders.has(node.id);

        return (
            <div key={node.id} className={`text-sm ${depth > 0 ? 'ml-4' : ''}`}>
                <div
                    onClick={() => {
                        if (node.type === 'file') {
                            onSelectFile(node.id);
                        } else if (node.type === 'folder') {
                            toggleFolder(node.id);
                        }
                    }}
                    className={`flex items-center py-1.5 px-2 rounded cursor-pointer group
                                hover:bg-gray-700/70 transition-colors duration-150
                                ${selectedFileId === node.id && node.type === 'file' ? 'bg-purple-600/60 text-white' : 'text-gray-300'}`}
                >
                    {node.type === "folder" ? (
                        <>
                            {isExpanded ? (
                                <ChevronDown size={16} className="mr-2 text-gray-500 group-hover:text-gray-300" />
                            ) : (
                                <ChevronRight size={16} className="mr-2 text-gray-500 group-hover:text-gray-300" />
                            )}
                            <Folder size={16} className="mr-2 text-purple-400 group-hover:text-purple-300" />
                        </>
                    ) : (
                        <FileText size={16} className="mr-2 ml-[24px] text-blue-400 group-hover:text-blue-300" /> // ml-[24px] to align with folder text
                    )}
                    <span className={`${node.type === 'folder' ? 'font-medium text-gray-200 group-hover:text-white' : 'text-gray-300 group-hover:text-gray-100'}`}>
                        {node.name}
                    </span>
                </div>
                {node.children && isExpanded && (
                    <div className="border-l border-gray-700/50">
                        {node.children.map(child => renderNode(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    }

    // Automatically expand the root folder if there's only one
    useState(() => {
        if (nodes.length === 1 && nodes[0].type === 'folder') {
            setExpandedFolders(new Set([nodes[0].id]));
        }
    });


    return (
        <div className="p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg h-full overflow-y-auto custom-scrollbar shadow-inner">
            <h3 className="text-lg font-semibold text-white mb-3 px-1 sticky top-0 bg-gray-800/80 backdrop-blur-sm py-2 z-10">Project Structure</h3>
            <div className="pt-1"> {/* Add padding top to prevent content from hiding under sticky header */}
                {nodes.map(node => renderNode(node))}
            </div>
        </div>
    );
};

export default FileTree;
