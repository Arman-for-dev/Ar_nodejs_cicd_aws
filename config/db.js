import mongoose from "mongoose";


const connectDB = async () =>{
    const db = process.env.MONGODB_URI;
    try {
          await mongoose.connect(db);
          console.log("Database connected!")
    } catch (e) {
        process.exit(1);
    }
}

export default connectDB;