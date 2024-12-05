import React from 'react'
import fs from 'fs/promises';

const page = async ({ params }) => {
    let { email } = await params;
    email = decodeURIComponent(email);

    let feedbacks = [];
    try {
        feedbacks = await fs.readFile('./feedback.json', 'utf-8');
        feedbacks = JSON.parse(feedbacks);

        feedbacks = feedbacks.filter(feedback => feedback.email === email);
    } catch (error) {
        console.log(error.message);
    }

    if (Array.isArray(feedbacks) && !!feedbacks.length) {
        return (
            <React.Fragment>
                <div className="!container grid grid-cols-1 gap-x-8 gap-y-16 !mx-auto py-8 border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {
                        feedbacks.map((feedback, i) => {
                            return (
                                <article
                                    key={i}
                                    className="flex max-w-xl flex-col items-start justify-between bg-gray-200 px-8 py-8 rounded cursor-pointer">
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={feedback.date} className="text-gray-500">
                                            {
                                                new Date(feedback.date).toDateString()
                                            }
                                        </time>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            Feedback
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {
                                                feedback.feedback_message
                                            }
                                        </p>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-gray-900">
                                                <a href="#">
                                                    <span className="absolute inset-0"></span>
                                                    {
                                                        feedback.name
                                                    }
                                                </a>
                                            </p>
                                            <p className="text-gray-600">
                                                {
                                                    feedback.email
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <div className="!container grid grid-cols-1 gap-x-8 gap-y-16 !mx-auto py-8 border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        No Feedbacks
                    </h3>
                </div>
            </React.Fragment>
        )
    }
}

export async function generateMetadata({ params }) {
    let { email } = await params;
    email = decodeURIComponent(email);

    return {
        title: `Feedback - ${email}`,
        description: `Feedback for ${email}`,
    }
}

export default page;
