import React from 'react'
import Loader from './Loader';

const Loading = () => {
    return (
        <div>
            <div className="container mx-auto py-20">
                <section>
                    <div className="flex flex-col items-center justify-center">
                        <Loader />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Loading;
