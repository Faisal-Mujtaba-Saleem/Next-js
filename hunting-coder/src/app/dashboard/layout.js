import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper';
import '../styles/globals.css';
import React from "react";

export const metadata = {
    title: "Hunting Coder - Dashboard",
    description: "Access your personalized dashboard on Hunting Coder! Manage your account, post blogs, and track your activity seamlessly. Join the tech-savvy community to share your coding knowledge and stay updated with the latest in programming",
};

export default function DashboardLayout({ children }) {
    return (
        <DashboardLayoutWrapper>
            {children}
        </DashboardLayoutWrapper>
    )
}
