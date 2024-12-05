import React from 'react'

const DisplayError = ({ error }) => {
    return (
        <>
            <div className="container mx-auto py-20">
                <section>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-red-500 text-2xl">
                            <span className='font-bold'>Error:</span> {error}
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DisplayError;