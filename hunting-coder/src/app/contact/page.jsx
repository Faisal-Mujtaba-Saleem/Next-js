"use client";
import React from 'react';
import submitContactAction from '../actions/submitContactAction';
import { Bounce, toast } from 'react-toastify';

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
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.75em" width="1.75em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                        </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="h-6 w-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/huntingcoder/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" className="h-6 w-6" />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" className="h-6 w-6" />
                    </a>
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