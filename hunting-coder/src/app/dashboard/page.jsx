"use client";
import React, { useContext } from 'react';
import { AuthorContext } from '@/contexts/author-context/context';
import { useSession } from 'next-auth/react';
import SignIn from '@/components/SignIn';
import AuthorProfile from '@/components/AuthorProfile';

const Page = () => {
    const { data: session } = useSession();

    const { author, authorFetchError } = useContext(AuthorContext);

    if (!session?.user) {
        return (
            <SignIn />
        )
    }

    return (
        <div className="container mx-auto px-6 py-12">
            {
                authorFetchError ?
                    <section>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-red-500 text-2xl">
                                <span className='font-bold'>Error:</span> {authorFetchError}
                            </p>
                        </div>
                    </section> :
                    !!author &&
                    <AuthorProfile author={author} />
            }
        </div>
    );
};

export default Page;

