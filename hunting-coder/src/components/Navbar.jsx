import NavSidebar from './NavSidebar';
import AppLinks from './AppLinks';
import Link from 'next/link';
import { ModeToggle } from './ToggleThemeButton';

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 bg-background/50 backdrop-blur-md shadow-lg border-b border-b-violet-100">
            <nav className="container mx-auto px-4 py-3 flex justify-center absolute md:relative md:bg-transparent">
                <div className="hidden md:flex justify-between items-center w-full">
                    <Link
                        href="/dashboard"
                        className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-yellow-100 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        Dashboard
                    </Link>

                    <ul className="flex items-center space-x-8 text-lg font-medium">
                        <AppLinks />
                        <ModeToggle />
                    </ul>
                </div>
                <NavSidebar>
                    <AppLinks />
                    <li className="mt-4">
                        <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            Dashboard
                        </Link>
                    </li>
                </NavSidebar>
            </nav>
        </div>
    );
}
