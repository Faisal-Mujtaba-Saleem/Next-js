"use client";
import React, { useEffect, useState } from 'react'
import { ReactTyped } from 'react-typed'

const AppHeader = () => {
    const [showTypedText, setShowTypedText] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShowTypedText(false);
        }, 2000);
    }, []);

    return (
        <header className="text-center mb-14">
            <h1 className="text-3xl font-bold">
                {
                    showTypedText ?
                        <ReactTyped
                            strings={["Hunting Coder"]}
                            typeSpeed={40}
                        /> :
                        "Hunting Coder"
                }
            </h1>
            <p className="text-lg">
                &quot;
                {
                    showTypedText ?
                        <ReactTyped
                            strings={["A blog for hunting coders by a hunting coder."]}
                            typeSpeed={20}
                        /> :
                        "A blog for hunting coders by a hunting coder."
                }
                &quot;
            </p>
        </header>
    )
}

export default AppHeader
