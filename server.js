import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



app.use("/", (req, res)=>{
    console.log("From Nodejs Server.")
});





const port = process.env.PORT || 8000;


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});