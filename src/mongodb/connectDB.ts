import mongoose from "mongoose";

interface isDBconnectedObjectType {
    isConnected?: number
}

const dbConnection: isDBconnectedObjectType = {}

export default async function dbConnect() {

    if (dbConnection.isConnected) {
        console.log("Mongoose is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGOOSE_URL as string, {});

        dbConnection.isConnected = db.connections[0].readyState;

        console.log("Mongoose connected successfully");
    } catch (err) {

        console.log("Database got crashed");
        process.exit(1);
    }


}