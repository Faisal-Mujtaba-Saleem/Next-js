import connectDB from '@/db/connect';
import Author from '@/db/models/Author';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function apiAuthenticationMiddleware(request) {
    try {
        const session_token = await request.cookies.get('authjs.session-token');
        const authorization = request.headers.get('authorization');
        const user_id = authorization?.split(' ')[1];

        // console.log(request.cookies, { session_token });

        if (!session_token) {
            console.log("No session token found in request headers");
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const session = await mongoose.connection.collection('sessions').findOne({ sessionToken: session_token.value });

        if (!session) {
            console.log("No session found");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.expires < Date.now()) {
            console.log("Session expired");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.userId.toString() !== user_id) {
            console.log("Unauthorized");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const author = await Author.findOne({ user_id: session.userId });

        if (!author)
            return NextResponse.json({ error: "Author not found" }, { status: 404 });

        request.nextUrl.searchParams.set('author_id', author._id);

        return null;
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
