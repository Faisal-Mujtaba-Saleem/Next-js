import { useContext, useState } from "react";
import { AuthorContext } from "@/contexts/author-context/context";
import { useSession } from "next-auth/react";
import { toast, Bounce } from "react-toastify";
import Image from "next/image";

const AuthorProfile = () => {
    const { data: session } = useSession();

    const { author, setAuthor } = useContext(AuthorContext);

    const handleRoleChange = (e) => {
        setAuthor({ ...author, role: e.target.value });
    };

    const handleBioChange = (e) => {
        setAuthor({ ...author, bio: e.target.value });
    };

    const handleUpdateProfileSubmition = async (e) => {
        try {
            e.preventDefault();

            // Send a PUT. request to the API to update the author
            const options = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${session?.user.id}`,
                },
                body: JSON.stringify(author)
            };

            const res = await fetch(`/api/author/update`, options)
            if (!res?.ok) throw new Error(res.error);

            const { message: update_message, updated_author } = await res.json();

            toast.success(update_message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            setAuthor({
                ...updated_author
            });

        } catch (error) {
            console.log(error.message);

            toast.error('Failed to update your profile.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <section>
            <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-xl drop-shadow-lg border">
                <h2 className="text-2xl font-semibold mb-6">Author Profile</h2>

                <div className="flex justify-center items-center mb-8">
                    <div className="relative w-28 h-28">
                        <Image
                            src={!!author?.image ? author?.image : "/profile.png"}
                            fill
                            sizes="100%"
                            alt={`${author?.name}'s Profile Picture`}
                            className="rounded-full ring-4 ring-gray-300"
                        />
                    </div>
                </div>

                <form onSubmit={handleUpdateProfileSubmition}>
                    {/* author Name */}
                    <div className="mb-6 cursor-not-allowed">
                        <label htmlFor="name" className="block text-sm font-medium mb-2 cursor-not-allowed">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={author?.name}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed"
                        />
                    </div>

                    {/* author Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium mb-2 cursor-not-allowed">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={author?.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed"
                        />
                    </div>

                    {/* author Role (Editable) */}
                    <div className="mb-6">
                        <label htmlFor="role" className="block text-sm font-medium mb-2">
                            Role / Profession
                        </label>
                        <input
                            id="role"
                            type="text"
                            value={author?.role}
                            onChange={handleRoleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* author Bio */}
                    <div className="mb-6">
                        <label htmlFor="bio" className="block text-sm font-medium mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={author?.bio}
                            onChange={handleBioChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AuthorProfile;