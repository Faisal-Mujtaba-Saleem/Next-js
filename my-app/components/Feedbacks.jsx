"use client";
import { fetchFeedbacksAction } from "@/app/actions/fetch-feedbacks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Feedbacks = ({ feedbackSubmitted }) => {
    const router = useRouter();
    const [feedbacks, setFeedbacks] = useState(null);

    const getFeedbacks = async () => {
        const feedbacks = await fetchFeedbacksAction();
        setFeedbacks(feedbacks);
    }

    useEffect(() => {
        getFeedbacks();
    }, [])

    useEffect(() => {
        if (feedbackSubmitted > 0) {
            getFeedbacks();
        }
    }, [feedbackSubmitted])


    if (!!feedbacks) {
        return (
            <div className="bg-white py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">People's Feedbacks</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Here are some of our happy clients who have feedback.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {
                            feedbacks.map((feedback, i) => {
                                let feedback_date = feedback.date.split('T')[0];

                                return (
                                    <article
                                        key={i}
                                        className="flex max-w-xl flex-col items-start justify-between bg-gray-200 px-8 py-8 rounded cursor-pointer"
                                        onClick={
                                            () => {
                                                router.push(`/feedback/${feedback.email}`);
                                            }
                                        }>
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={feedback_date} className="text-gray-500">
                                                {
                                                    new Date(feedback_date).toDateString()
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
                </div>
            </div>
        )
    } else {
        return <div className="bg-white py-8 sm:py-14">
            <p>
                Loading...
            </p>
        </div>
    }
}


export default Feedbacks
