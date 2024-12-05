"use client"

import React, { useEffect, useState } from 'react'

const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            alert("Your message has been sent successfully!");
            setIsSubmitted(false);
        }
    }, [isSubmitted])


    async function handleContactSubmission(e) {
        e.preventDefault();

        const url = "/api/contact/add";
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(contact),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            setContact({
                name: '',
                email: '',
                message: '',
            })

            setIsSubmitted(true);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <form className="mt-8" onSubmit={handleContactSubmission}>
            <div className="flex flex-col md:flex-row">
                <label htmlFor="name" className="block w-full md:w-1/2 md:mr-6">
                    <span className="block mb-2 font-bold">Name</span>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        className="block w-full p-2 border-2 border-gray-500 rounded-md"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        required />
                </label>
                <label htmlFor="email" className="block w-full md:w-1/2 md:ml-6">
                    <span className="block mb-2 font-bold">Email</span>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your email"
                        className="block w-full p-2 border-2 border-gray-500 rounded-md"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        required />
                </label>
            </div>
            <label htmlFor="message" className="block mt-6">
                <span className="block mb-2 font-bold">Message</span>
                <textarea
                    name="message"
                    id="message"
                    rows="4"
                    placeholder="Your message"
                    className="block w-full p-2 border-2 border-gray-500 rounded-md"
                    value={contact.message}
                    onChange={(e) => setContact({ ...contact, message: e.target.value })}
                    required></textarea>
            </label>
            <button type="submit" className="block w-full md:w-1/2 md:ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-6">Send</button>
        </form>
    )
}

export default ContactForm
