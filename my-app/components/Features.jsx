"use client"
import React, { useContext } from "react";
import { useSession, signIn } from "next-auth/react";

const Features = ({ features }) => {
    const { data: session } = useSession();

    if (session)
        return (
            <div className="bg-white flex flex-col items-center">
                <h2 className="text-3xl font-bold tracking-tight my-4 pt-8 text-gray-900 sm:text-4xl text-center">
                    Next.js Features
                    <span className='px-1 underline'>
                        ({Object.keys(features).length})
                    </span>
                </h2>
                <div className="!container grid grid-cols-1 gap-x-8 gap-y-16 mx-auto py-8 border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {
                        Object.keys(features).map((feature, i) => (
                            <article key={i} className="flex max-w-xl flex-col items-start justify-between bg-gray-300 rounded-lg p-4">
                                <div className="group relative">
                                    <h2 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <p>
                                            <span className="absolute inset-0" />
                                            {feature}
                                        </p>
                                    </h2>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{features[feature].description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <div className="text-sm leading-6">
                                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                                            Features
                                        </h3>
                                        <ul className='flex gap-4'>
                                            {
                                                features[feature].benefits.map((benefit, i) => (
                                                    <li key={i} className="text-gray-600">{benefit}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        ))
                    }
                </div>
            </div>
        )

    return (
        <div className="container h-[90vh] m-auto flex justify-center items-center">
            <div id="loggedout" className="flex flex-col justify-center items-center">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <!-- User icon --> */}
                    <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="2" />
                    <path d="M6 18c0-3 3-5 6-5s6 2 6 5" stroke="black" strokeWidth="2" />

                    {/* <!-- Strikethrough line --> */}
                    <line x1="4" y1="4" x2="20" y2="20" stroke="red" strokeWidth="2" />
                </svg>

                <div id="login-buttons" className="flex flex-col gap-4">
                    <button className='bg-[#30a14e] text-white px-3 py-2 rounded'
                        onClick={(e) => {
                            signIn("google");
                        }}
                    >
                        Sign in using Google
                    </button>
                    <button className='bg-[#30a14e] text-white px-3 py-2 rounded'
                        onClick={(e) => {
                            signIn("facebook");
                        }}
                    >
                        Sign in using Facebook
                    </button>
                    <button className='bg-[#30a14e] text-white px-3 py-2 rounded'
                        onClick={(e) => {
                            signIn("github");
                        }}
                    >
                        Sign in using Github
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Features
