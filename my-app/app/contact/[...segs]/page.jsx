import React from 'react'
import fs from 'fs/promises';
import { notFound } from 'next/navigation';

const page = async ({ params }) => {
    const { segs } = await params;
    const joinedSegs = decodeURIComponent(segs.join('/'));

    if (segs.length === 2 && joinedSegs.endsWith('@gmail.com/messages')) {
        const email = decodeURIComponent(segs[0]);

        let contacts = [];
        try {
            contacts = await fs.readFile('./contact.json', 'utf-8');
            contacts = JSON.parse(contacts);

            contacts = contacts.filter(conatct => conatct.email === email);
        } catch (error) {
            console.log(error.message);
        }

        if (Array.isArray(contacts) && !!contacts.length) {
            return (
                <React.Fragment>
                    <div className="!container grid grid-cols-1 gap-x-8 gap-y-16 !mx-auto py-8 border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {
                            contacts.map(
                                (contact, i) => {
                                    const d_ago = parseInt(
                                        (new Date() - new Date(contact.date)) / (1000 * 60 * 60 * 24)
                                    );
                                    return (
                                        <div key={i} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                            {/* <!-- User and Time Container --> */}
                                            <div className="flex justify-between items-center mb-2">
                                                {/* <!-- User Name and Action --> */}
                                                <div className="font-semibold text-gray-800 text-lg">
                                                    <span className="text-blue-600">
                                                        {contact.name}
                                                    </span>
                                                    <span className='text-sm italic'>
                                                        {""} {contact.email}
                                                    </span>
                                                </div>
                                                {/* <!-- Time --> */}
                                                <time
                                                    dateTime={contact.date} className="text-gray-500 text-sm">
                                                    {d_ago}d ago
                                                </time>
                                            </div>
                                            {/* <!-- Comment Content --> */}
                                            <p className="text-gray-700">
                                                {contact.message}
                                            </p>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <div className='container mx-auto py-8'>
                    <p className='text-center'>No messages found</p>
                </div>
            )
        }
    } else {
        notFound();
    }
}

export async function generateMetadata({ params }) {
    const { segs } = await params;
    const email = decodeURIComponent(segs[0]);

    return {
        title: `Contact - ${email}`,
        description: `This is the contact messages page for ${email}`,
    }
}

export default page;