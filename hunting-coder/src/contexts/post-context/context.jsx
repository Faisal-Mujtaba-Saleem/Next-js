"use client";
import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [blogposts, setBlogposts] = useState([]);

    const [postContent, setPostContent] = useState({
        html_content: "",
        md_content: "",
    });

    return (
        <PostContext.Provider value={{
            blogposts, setBlogposts,
            postContent, setPostContent
        }}>
            {children}
        </PostContext.Provider>
    );
};
