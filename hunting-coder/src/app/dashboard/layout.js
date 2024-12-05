"use client";
import '../styles/globals.css';
import React, { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SessionProvider } from "next-auth/react";
import { AuthorContextProvider } from '@/contexts/author-context/context';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <SessionProvider>
            <AuthorContextProvider>
                <div className="h-auto flex flex-col">
                    {/* Layout */}
                    <header className="group h-14 w-full p-3 z-40 sticky top-16">
                        <span className="lg:text-transparent transition-colors duration-150 group-hover:text-inherit">
                            <button
                                className="transition-colors duration-150 group-hover:shadow backdrop:blur"
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            {/* <h1 className="text-lg font-bold">Dashboard</h1> */}
                        </span>
                    </header>

                    <div className="flex flex-1">
                        {/* Sidebar */}
                        <div className={`shadow-lg block w-64 fixed inset-y-0 z-20 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                            <DashboardSidebar />
                        </div>

                        {/* Main Content */}
                        <main className="flex-1 justify-center items-center w-full h-full container m-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </AuthorContextProvider>
        </SessionProvider>
    );
}
