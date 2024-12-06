import React from 'react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import ContactForm from '@/components/ContactForm';

const Page = () => {

    return (
        <div className="flex justify-center items-center min-h-screen p-16">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="mt-2 break-words w-10/12">
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

            <ContactForm />
        </div>
    );
};

export default Page;

export const metadata = {
    title: "Hunting Coder - Contact",
    description: "Get in touch with us at Hunting Coder! Have questions, feedback, or collaboration ideas? Reach out through our contact page, and we'll connect with you to help grow our tech community.",
};