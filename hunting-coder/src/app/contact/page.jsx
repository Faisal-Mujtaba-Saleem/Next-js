"use client";
import React from 'react';
import Image from 'next/image';
import { Bounce, toast } from 'react-toastify';
import submitContactAction from '../actions/submitContactAction';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';

const Page = () => {
    const submitContactActionHandler = async (contact_form) => {
        const res = await submitContactAction(contact_form);

        if (res.success) {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
        else {
            toast.error(res.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="mt-2 break-words w-11/12">
                    Got questions or ideas? Reach out to us and become a part of
                    the Hunting Coder community!
                </p>
                <div className="social-links flex justify-between items-center mt-8 w-2/5">
                    {
                        [
                            { text: "gitHub", icon: GithubIcon },
                            { text: "linkedIn", icon: LinkedinIcon },
                            { text: "twitter", icon: TwitterIcon },
                            { text: "instagram", icon: InstagramIcon },
                            { text: "facebook", icon: FacebookIcon },
                        ].map((platform) => (
                            <a
                                key={platform.text}
                                href={`https://${platform.text}.com`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative h-8 w-8 flex justify-center items-center"
                            >
                                <platform.icon />
                            </a>
                        ))
                    }
                </div>

            </div>
            <div className="p-8 shadow-md shadow-gray-400 dark:shadow-violet-400 rounded-lg">
                <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                <form action={submitContactActionHandler} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
                            <input id="first_name" name="first_name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
                            <input id="last_name" name="last_name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium">phone_number number</label>
                        <input id="phone_number" name="phone_number" type="tel" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">Message</label>
                        <textarea id="message" name="message" rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 border border-blue-500 dark:border-violet-500 rounded-md shadow-lg hover:dark:bg-violet-700 hover:bg-blue-500 hover:text-white focus:outline-none">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;