"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOutAction } from "@/app/actions/authAction";
import { AuthorContext } from "@/contexts/author-context/context";
import { useContext } from "react";

const DashboardSidebar = () => {
    const { data: session } = useSession();

    const { author } = useContext(AuthorContext);

    return (
        <aside
            className="fixed top-0 left-0 h-full w-64 bg-background/100 shadow-2xl drop-shadow-2xl border-r border-violet-100 z-50 md:translate-x-0 transform transition-transform duration-300"
            aria-label="Dashboard Sidebar"
        >
            <div className="flex flex-col justify-evenly h-full p-6">
                {/* User Profile Section */}
                <section aria-labelledby="user-profile-heading">
                    <header id="user-profile-heading" className="sr-only">
                        User Profile
                    </header>
                    <div className="flex flex-col items-center text-center py-4">
                        {session?.user && author ? (
                            <>
                                <div className="relative w-20 h-20">
                                    <Image
                                        src={author?.image}
                                        fill
                                        sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                                        alt={`${author?.name}'s Profile Picture`}
                                        className="rounded-full ring-4 ring-gray-300"
                                    />
                                </div>
                                <div className="pt-2">
                                    <p className="text-lg font-semibold">
                                        {author?.name}
                                    </p>
                                    <p className="text-sm font-light">
                                        {author?.role}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative w-20 h-20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-full h-full"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <div className="pt-2">
                                    <p className="text-lg font-semibold">
                                        {"Guest User"}
                                    </p>
                                    <p className="text-sm font-light">
                                        {"example@example.com"}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Navigation Section */}
                <nav aria-label="Sidebar Navigation">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center px-4 py-2 hover:border hover:border-violet-200 rounded-md transition"
                                aria-label="Dashboard"
                            >
                                <svg
                                    className="w-6 h-6 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12L11.204 3.045a1.125 1.125 0 011.592 0L21.75 12M4.5 9.75V21a1.125 1.125 0 001.125 1.125h3.75v-6h2.25v6h3.75A1.125 1.125 0 0020.25 21V9.75"
                                    />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/create-post"
                                className="flex items-center px-4 py-2 hover:border hover:border-violet-200 rounded-md transition"
                                aria-label="Create New Post"
                            >
                                <svg
                                    className="w-6 h-6 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                New Post
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/posts"
                                className="flex items-center px-4 py-2 hover:border hover:border-violet-200 rounded-md transition"
                                aria-label="View Posts"
                            >
                                <svg
                                    className="w-6 h-6 mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                Posts
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Sign Out Section */}
                {session?.user && (
                    <footer aria-labelledby="signout-section">
                        <header id="signout-section" className="sr-only">
                            Sign Out
                        </header>
                        <form action={signOutAction}>
                            <button
                                type="submit"
                                name="provider"
                                value={session?.user?.provider}
                                className="w-full px-4 py-2 text-sm font-semibold text-red-600 hover:text-white border border-red-600 rounded-md hover:bg-red-600 hover:focus:ring focus:ring-red-500"
                                aria-label="Sign Out"
                            >
                                Sign Out
                            </button>
                        </form>
                    </footer>
                )}
            </div>
        </aside>
    );
};

export default DashboardSidebar;
