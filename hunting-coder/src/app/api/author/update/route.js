import connectDB from "@/db/connect";
import Author from "@/db/models/Author";
import { apiAuthenticationMiddleware } from "@/app/api/middlewares/authenticationMiddleware/middleware";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const connection = await connectDB();
        if (!connection) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

        const auth_response = await apiAuthenticationMiddleware(request);
        if (auth_response) return auth_response;

        const request_body = await request.json();
        const author_id = request.nextUrl.searchParams.get('author_id');

        const updated_author = await Author.findOneAndUpdate(
            { _id: author_id }, // Filter by slug
            { $set: { ...request_body } },
            { new: true }
        );

        if (!updated_author) return NextResponse.json({ error: "Author not found" }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Author updated successfully!",
                updated_author
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}