"use server";
import { auth } from "@/lib/auth";
import connectDB from "@/db/connect";
import Author from "@/db/models/Author";
import Post from "@/db/models/Post";
import slugify from "slugify";

export const createPostAction = async (create_post_form) => {
    try {
        const user = (await auth())?.user;
        if (!user) throw new Error("Unauthorized");

        let post = Object.fromEntries(create_post_form);
        post.content = JSON.parse(post.content);
        post.slug = slugify(post.title, { lower: true, strict: true, replace: '-' });

        const connection = await connectDB();
        if (!connection) throw new Error("Database connection error");

        const author = await Author.findOne({ user_id: user.id });
        if (!author) throw new Error("Author not found");

        post.author = author._id;

        const created_post = await Post.create(post);
        if (!created_post)
            throw new Error("Failed to create post");

        return {
            success: true,
            message: `Successfully created a post!`,
        };

    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
};
