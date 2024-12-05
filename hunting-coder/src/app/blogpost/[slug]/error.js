'use client';

export default function Error({ error, reset }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen shadow-md shadow-gray-500/50">
            <h2 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h2>
            <p className="text-lg">{error.message || "An unknown error occurred."}</p>
            <button
                className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
                onClick={reset}
            >
                Try Again
            </button>
        </div>
    );
}
