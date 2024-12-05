import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/db/mongoClient";
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        GitHub,
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user?.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token?.sub
            }
            return session
        }
    }
})