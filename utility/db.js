import mongoose from "mongoose"; //A library that allows us to connect and interact with a MongoDB database easily in a Node.js application.
import dotenv from "dotenv"; //A package that helps us load environment variables from a .env file into process.env. This is useful to keep sensitive data (like database credentials) safe.
dotenv.config();

const connectDB = async () =>{
    
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (error) {
        console.log("Internal server error.");
    }
}

export default connectDB;