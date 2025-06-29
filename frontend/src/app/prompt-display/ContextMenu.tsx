"use client";

import React from 'react';
import { Edit2, Trash2, FilePlus, FolderPlus, X } from 'lucide-react';

interface ContextMenuProps {
    x: number;
    y: number;
    nodeType: 'file' | 'folder' | null; // Type of node the context menu is for
    onClose: () => void;
    onRename: () => void;
    onDelete: () => void;
    onNewFile?: () => void; // Optional: only for folders or general area
    onNewFolder?: () => void; // Optional: only for folders or general area
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    x,
    y,
    nodeType,
    onClose,
    onRename,
    onDelete,
    onNewFile,
    onNewFolder,
}) => {
    // Basic viewport boundary adjustment to prevent menu from going off-screen.
    const screenPadding = 10; // Minimum padding from screen edges.
    const menuWidth = 180;    // Approximate width of the context menu.
    const menuHeight = nodeType === 'file' ? 100 : (nodeType === 'folder' ? 180 : 100) ; // Approximate height, varies by content.

    // Adjust X position if menu would overflow horizontally.
    const adjustedX = x + menuWidth > window.innerWidth - screenPadding
        ? window.innerWidth - menuWidth - screenPadding
        : x;
    // Adjust Y position if menu would overflow vertically.
    const adjustedY = y + menuHeight > window.innerHeight - screenPadding
        ? window.innerHeight - menuHeight - screenPadding
        : y;

    return (
        <div
            className="fixed p-2 bg-gray-700/90 backdrop-blur-md rounded-lg shadow-2xl border border-gray-600/50 text-white text-sm font-geist"
            style={{ top: adjustedY, left: adjustedX, zIndex: 1000 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing immediately if parent has a global click listener
        >
            <button
                onClick={onClose}
                className="absolute top-1 right-1 text-gray-400 hover:text-white p-1 rounded-full"
                aria-label="Close context menu"
            >
                <X size={16} />
            </button>

            {nodeType && ( // Options specific to a selected node
                <>
                    <button
                        onClick={onRename}
                        className="flex items-center w-full px-3 py-1.5 hover:bg-purple-600/70 rounded transition-colors"
                    >
                        <Edit2 size={14} className="mr-2" /> Rename
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center w-full px-3 py-1.5 hover:bg-red-600/70 rounded transition-colors"
                    >
                        <Trash2 size={14} className="mr-2" /> Delete
                    </button>
                </>
            )}

            {nodeType === 'folder' && onNewFile && onNewFolder && ( // Options for folders
                <>
                    <div className="my-1 border-t border-gray-600/70"></div>
                    <button
                        onClick={onNewFile}
                        className="flex items-center w-full px-3 py-1.5 hover:bg-blue-600/70 rounded transition-colors"
                    >
                        <FilePlus size={14} className="mr-2" /> New File
                    </button>
                    <button
                        onClick={onNewFolder}
                        className="flex items-center w-full px-3 py-1.5 hover:bg-blue-600/70 rounded transition-colors"
                    >
                        <FolderPlus size={14} className="mr-2" /> New Folder
                    </button>
                </>
            )}

            {!nodeType && onNewFile && onNewFolder && ( // Options for general area (e.g. right click on empty space in tree)
                 <>
                    <button
                        onClick={onNewFile}
                        className="flex items-center w-full px-3 py-1.5 hover:bg-blue-600/70 rounded transition-colors"
                    >
                        <FilePlus size={14} className="mr-2" /> New File in Root
                    </button>
                    <button
                        onClick={onNewFolder}
                        className="flex items-center w-full px-3 py-1.5 hover:bg-blue-600/70 rounded transition-colors"
                    >
                        <FolderPlus size={14} className="mr-2" /> New Folder in Root
                    </button>
                </>
            )}
        </div>
    );
};

export default ContextMenu;
