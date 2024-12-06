"use client"
import React, { useEffect, useState } from 'react'
import { ReactTyped } from 'react-typed'

const AboutHeader = () => {
    const [showTypedText, setShowTypedText] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowTypedText(false);
        }, 5000);
    })

    return (
        <div>
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold">
                    Welcome to <span className="text-yellow-400">
                        {
                            <ReactTyped
                                strings={["Hunting Coder"]}
                                typeSpeed={60}
                                backSpeed={70}
                                backDelay={1500}
                                startDelay={1000}
                                loop
                            />
                        }
                    </span>
                </h1>
                <p className="mt-4 text-lg md:text-2xl font-light">
                    &quot;
                    {
                        showTypedText ?
                            <ReactTyped
                                strings={[`A blog for hunting coders by a hunting coder.`]}
                                typeSpeed={40}
                                startDelay={1000}
                            /> :
                            `A blog for hunting coders by a hunting coder.`
                    }
                    &quot;
                </p>
            </div>
            <div className="absolute inset-0 bg-noise-pattern opacity-20 pointer-events-none"></div>
        </div>
    )
}

export default AboutHeader
