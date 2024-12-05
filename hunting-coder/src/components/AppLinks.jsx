import React from 'react'
import Link from 'next/link';

const AppLinks = () => {
    return (
        <React.Fragment>
            <li>
                <Link
                    href="/"
                    className="relative transition-all duration-300 ease-in-out transform hover:text-indigo-600 hover:scale-110 font-bold"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="/about"
                    className="relative transition-all duration-300 ease-in-out transform hover:text-indigo-600 hover:scale-110 font-bold"
                >
                    About
                </Link>
            </li>
            <li>
                <Link
                    href="/blog"
                    className="relative transition-all duration-300 ease-in-out transform hover:text-indigo-600 hover:scale-110 font-bold"
                >
                    Blog
                </Link>
            </li>
            <li>
                <Link
                    href="/contact"
                    className="relative transition-all duration-300 ease-in-out transform hover:text-indigo-600 hover:scale-110 font-bold"
                >
                    Contact
                </Link>
            </li>
        </React.Fragment>
    )
}

export default AppLinks
