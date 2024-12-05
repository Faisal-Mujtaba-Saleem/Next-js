import connectDB from "@/db/connect";
import Post from "@/db/models/Post";
import { apiAuthenticationMiddleware } from "@/app/api/middlewares/authenticationMiddleware/middleware";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const { slug } = await params;

        const connection = await connectDB();
        if (!connection) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

        const auth_response = await apiAuthenticationMiddleware(request);
        if (auth_response) return auth_response;

        const deleted_post = await Post.findOneAndDelete(
            { slug } // Filter by slug
        );

        if (!deleted_post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Post deleted successfully",
                deleted_post
            },
            { status: 200 }
        )

    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            {
                success: false,
                error: error.message
            },
            { status: 500 }
        );
    }
}