import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);





const port = process.env.PORT || 8000;


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});