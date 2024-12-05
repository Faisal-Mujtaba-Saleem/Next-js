import connectDB from "@/db/connect";
import Post from "@/db/models/Post";
import { apiAuthenticationMiddleware } from "@/app/api/middlewares/authenticationMiddleware/middleware";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const request_body = await request.json();

        const { slug } = await params;

        const connection = await connectDB();
        if (!connection) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

        const auth_response = await apiAuthenticationMiddleware(request);
        if (auth_response) return auth_response;


        const updated_post = await Post.findOneAndUpdate(
            { slug }, // Filter by slug
            { $set: { ...request_body } },
            { new: true }
        ).populate('author');

        if (!updated_post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Post updated successfully!",
                updated_post
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}