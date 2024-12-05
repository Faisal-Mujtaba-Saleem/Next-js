"use client";
import { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = ({ children }) => {
    const [blogposts, setBlogposts] = useState([]);

    const [postContent, setPostContent] = useState({
        html_content: "",
        md_content: "",
    });

    return (
        <PostsContext.Provider value={{
            blogposts, setBlogposts,
            postContent, setPostContent
        }}>
            {children}
        </PostsContext.Provider>
    );
};
