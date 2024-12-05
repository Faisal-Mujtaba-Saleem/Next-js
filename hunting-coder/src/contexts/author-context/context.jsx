"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const AuthorContext = createContext();

const fetchAuthor = async (user) => {
    try {
        const fetch_author_options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.id}`,
            },
            body: JSON.stringify(
                // IIFE Arrow Fn
                (
                    ({ id: user_id, ...user }) => ({ user_id, ...user })
                )(user)
            )
        };

        const fetch_author_response = await fetch('/api/author/fetch/', fetch_author_options);

        const fetched_author = await fetch_author_response.json();
        return fetched_author;

    } catch (error) {
        throw new Error(error.message);
    }
}

export const AuthorContextProvider = ({ children }) => {
    const { data: session } = useSession();

    const [author, setAuthor] = useState(null);
    const [authorFetchError, setAuthorFetchError] = useState(null)


    useEffect(() => {
        if (session?.user) {
            fetchAuthor(session?.user)
                .then((fetched_author) => {
                    setAuthor({ ...fetched_author });
                })
                .catch((error) => {
                    console.log(error.message);
                    setAuthorFetchError('An error occurred while fetching the author.');
                })
        }
    }, [session]);

    return (
        <AuthorContext.Provider value={{
            author, setAuthor,
            authorFetchError
        }}>
            {children}
        </AuthorContext.Provider>
    );
};
