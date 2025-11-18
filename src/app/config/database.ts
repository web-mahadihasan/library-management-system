import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(`${process.env.DB_URL}`);
        console.log("\x1b[32m%s\x1b[0m", "✅ Connected to MongoDB Using Mongoose!!");
    } catch (error) {
        console.log("Failed to connect database");
        process.exit(1);
    }    
}

export default connectDatabase;