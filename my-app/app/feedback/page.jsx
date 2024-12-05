"use client";
import React, { useEffect, useRef, useState } from 'react';
import Feedbacks from '@/components/Feedbacks';
import { submitFeedbackAction } from '../actions/feedback';

const Feedback = () => {
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(0);

    const feedback_form = useRef(null);

    const handleFeedbackSubmission = (feedback) => {
        submitFeedbackAction(feedback);
        feedback_form.current.reset();
        alert("Thank you for your feedback!");
        setFeedbackSubmitted(feedbackSubmitted + 1);
    }
    return (
        <React.Fragment>
            <div className="container mx-auto p-4 md:p-6 lg:p-12 flex flex-col">
                <div className='feedback-form'>
                    <h1 className="text-5xl font-bold">Feedback</h1>
                    <p className="text-2xl mt-4">I appreciate any feedback from you. Please fill out the form below.</p>

                    <form action={
                        handleFeedbackSubmission
                    }
                        ref={feedback_form}
                    >
                        <div className="flex flex-col md:flex-row gap-4 mt-8">
                            <div className="flex-1">
                                <label htmlFor="name" className="block">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="email" className="block">
                                    Your Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Email"
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <label htmlFor="feedback_message" className="block">
                                Feedback
                            </label>
                            <textarea
                                id="feedback_message"
                                name="feedback_message"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Feedback here"
                                rows={5}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8"
                        >
                            Send
                        </button>
                    </form>
                </div>
                <div className="feedbacks">
                    <Feedbacks feedbackSubmitted={feedbackSubmitted} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Feedback
