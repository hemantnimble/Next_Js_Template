import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("DATABASE connected")
        })
    }
    catch (error) {
        console.log("error Connecting Database", error)
    }
}