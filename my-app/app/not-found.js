import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
            <div className="text-center max-w-lg">
                {/* Icon */}
                <div className="mb-8">
                    <svg
                        className="w-24 h-24 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M12 18.5c-5.523 0-10-4.477-10-10S6.477 3 12 3s10 4.477 10 10-4.477 10-10 10zm0-18v2m0 16v2m8-10h2m-16 0H2"
                        />
                    </svg>
                </div>
                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h1>
                {/* Description */}
                <p className="text-gray-600 mb-8">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </p>
                {/* Buttons */}
                <div className="space-x-4">
                    <a
                        href="/"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all"
                    >
                        Go to Homepage
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
