"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Trigger fade-in
        const timer = setTimeout(() => {
            setIsVisible(false); // Trigger fade-out
            setTimeout(onClose, 300); // Call onClose after fade-out animation
        }, 3000); // Auto-dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, [message, type, onClose]);

    let bgColor = 'bg-blue-600/90 backdrop-blur-md border border-blue-500/50';
    let Icon = Info;

    if (type === 'success') {
        bgColor = 'bg-green-600/90 backdrop-blur-md border border-green-500/50';
        Icon = CheckCircle;
    } else if (type === 'error') {
        bgColor = 'bg-red-600/90 backdrop-blur-md border border-red-500/50';
        Icon = XCircle;
    }

    return (
        <div
            // Changed from bottom-5 to top-20 to align with usage in prompt-display page
            className={`fixed top-20 right-5 p-4 rounded-lg shadow-2xl text-white ${bgColor} transition-all duration-300 ease-in-out transform
                        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`} // Slide in from right
            style={{ zIndex: 1000 }}
        >
            <div className="flex items-center">
                <Icon size={24} className="mr-3 flex-shrink-0" />
                <span>{message}</span>
                <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="ml-4 text-white hover:text-gray-200">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Notification;
