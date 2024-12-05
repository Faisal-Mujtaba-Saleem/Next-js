import ContactForm from '@/components/ContactForm'
import React from 'react'

const Contact = () => {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-12">
            <div id="contact-form">
                <h1 className="text-5xl font-bold">Get in touch</h1>
                <p className="text-2xl mt-4">I&apos;d love to hear from you. Please fill out the form below.</p>
                <ContactForm />
            </div>
        </div>
    )
}

export default Contact

export const metadata = {
    title: "Contact - Contact Form of My first Next.js app",
    description: "This is the contact form of My first Next.js app",
};
