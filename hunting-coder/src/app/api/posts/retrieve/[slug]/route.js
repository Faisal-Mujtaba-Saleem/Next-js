import { apiAuthenticationMiddleware } from "@/app/api/middlewares/authenticationMiddleware/middleware";
import connectDB from "@/db/connect";
import Post from "@/db/models/Post";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { slug } = await params;

        const connection = await connectDB();
        if (!connection) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

        const auth_response = await apiAuthenticationMiddleware(request);

        if (auth_response) {
            const post = await Post.findOne({ slug }).populate('author', "-user_id");

            return NextResponse.json(post, { status: 200 });
        }

        const post = await Post.findOne({ slug }).populate('author');

        return NextResponse.json(post, { status: 200 });

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
