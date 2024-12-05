"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { submitUserAction } from '@/app/actions/auth-session';

const Navbar = () => {
    const { data: session } = useSession();

    const [count, setCount] = useState(0);
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        setRenderCount(renderCount + 1);
        if (session?.user && renderCount === 1) {
            submitUserAction(session);
        }
    }, [session])

    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto flex justify-between md:flex-row flex-col items-center lg:py-0 py-4">
                <div id='nav-links' className='flex gap-4 md:flex-row flex-col items-center'>
                    <Link href="/" className="rounded-md bg-gray-700 px-3 py-2 text-xl font-medium text-white">
                        My Next App
                    </Link>
                    <div className="flex">
                        <Link href="/" className='text-white text-lg px-3 py-2'>
                            Home
                        </Link>
                        <Link href="/about" className='text-white text-lg px-3 py-2'>
                            About
                        </Link>
                        <Link href="/contact" className='text-white text-lg px-3 py-2'>
                            Contact
                        </Link>
                        <Link href="/feedback" className='text-white text-lg px-3 py-2'>
                            Feedback
                        </Link>
                    </div>
                </div>
                <div id='nav-right' className="flex justify-around items-center w-1/6 lg:flex-row flex-col">
                    <div id='counter' className='flex justify-center items-center'>
                        <button className='bg-blue-500 text-white my-4 px-3 py-2 rounded'
                            onClick={() => setCount(count + 1)}>
                            +
                        </button>
                        <span className='text-white p-2'>
                            {count}
                        </span>
                        <button className='bg-red-500 text-white px-3 py-2 rounded' onClick={() => setCount(count - 1)}>
                            -
                        </button>
                    </div>
                    <div id="auth">
                        {
                            session ?
                                <button className='bg-[#30a14e] text-white px-3 py-2 rounded'
                                    onClick={(e) => {
                                        signOut();
                                    }}
                                >
                                    Sign out
                                </button> :
                                <button className='bg-[#30a14e] text-white px-3 py-2 rounded'
                                    onClick={(e) => {
                                        signIn();
                                    }}
                                >
                                    Sign in
                                </button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Navbar);
