import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        // Ensure MONGODB_URI is defined
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        // Cache the database connection state to avoid multiple connections
        let cached_db = global.mongoose;

        if (!cached_db) {
            // Initialize global mongoose cache if it doesn't exist
            cached_db = global.mongoose = { conn: null, promise: null };
        }

        // Return existing connection if already established
        if (cached_db.conn) {
            console.log("=> Using existing database connection");
            return cached_db.conn;
        }

        // Otherwise, establish a new connection if not already in progress
        if (!cached_db.promise) {
            cached_db.promise = Promise.resolve(
                (await mongoose.connect(MONGODB_URI, {}))?.connection
            );
        }


        // Wait for the connection to be established
        cached_db.conn = await cached_db.promise;

        // Check if the connection is successfully established
        if (cached_db.conn.readyState === 1) {
            console.log(`Connected to MongoDB at ${cached_db.conn.host}`);
            return cached_db.conn;
        }

        console.log("Failed to connect to MongoDB");
        return null;

    } catch (error) {
        console.error("Database connection error:", error.message);
        return null;
    }
}

export default connectDB;
