import { apiAuthenticationMiddleware } from "@/app/api/middlewares/authenticationMiddleware/middleware";
import connectDB from "@/db/connect";
import Author from "@/db/models/Author";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const connection = await connectDB();
        if (!connection) return NextResponse.json({ error: "Database connection error" }, { status: 500 });

        const request_body = await request.json();

        const auth_response = await apiAuthenticationMiddleware(request);

        if (!auth_response) {
            const author_id = request.nextUrl.searchParams.get('author_id');

            const author = await Author.findOne({ _id: author_id });

            return NextResponse.json(author, { status: 200 });
        }

        else if (auth_response?.status === 401) return auth_response;

        else if (auth_response?.status === 404) {
            const author = await Author.create(request_body);

            if (!author) return NextResponse.json(
                { error: "Failed to create author" },
                { status: 500 }
            );

            return NextResponse.json(
                {
                    success: true,
                    message: "Author created successfully!",
                    author
                }
                , { status: 200 }
            );
        }

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}