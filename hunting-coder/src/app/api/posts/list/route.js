import connectDB from "@/db/connect";
import Post from "@/db/models/Post";
import { NextResponse } from "next/server";
import { apiAuthenticationMiddleware } from "../../middlewares/authenticationMiddleware/middleware";


export async function GET(request) {
    try {
        // Connect to the database
        const connection = await connectDB();
        if (!connection) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

        const auth_response = await apiAuthenticationMiddleware(request);

        const author_id = request.nextUrl.searchParams.get('author_id');

        // Pagination Calculation

        const page = request.nextUrl.searchParams.get('page') || 1;
        if (!!page && typeof page === 'string') parseInt(page);

        const limit = request.nextUrl.searchParams.get('limit') || 10;
        if (!!limit && typeof limit === 'string') parseInt(limit);

        // Pages to skip
        const skip = (page - 1) * limit;

        // Count the total posts
        const total_posts = await Post.countDocuments({});

        // Fetch all posts
        const posts = !!auth_response ?
            await Post.find({})
                .sort({ '_id': -1, publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('author', "-user_id") :
            await Post.find({ author: author_id })
                .sort({ '_id': -1, publishedAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('author');

        return NextResponse.json(
            {
                total_posts,
                posts
            }, { status: 200 }
        );

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
