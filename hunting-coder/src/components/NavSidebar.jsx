"use client";
import { useState } from 'react';

export default function NavSidebar({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:hidden flex justify-between items-center w-full">
            {/* Links - Center or Left Aligned */}
            <div className="flex-1 flex justify-start">
                <ul className={`space-y-4 md:space-y-0 md:space-x-4 md:flex ${isOpen ? 'block' : 'hidden'}`}>
                    {children}
                </ul>
            </div>

            {/* Toggle Button - Right Aligned */}
            <button
                className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 self-start"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
            >
                {
                    isOpen ?
                        // Close Icon
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        :
                        // Hamburger Icon
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                }
            </button>
        </div>
    );
}
