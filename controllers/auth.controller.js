import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/token.js";


export const signup = async (req, res) =>{

    const {username, email, password} = req.body;

    if(username === "" || email === ""  || password === "" ){
        return res.status(400).json({message: "Field must not be empty!"});
    }
    
    const existsUser = await User.findOne({email});
    if(existsUser){
        return res.status(400).json({message: "Email has Taken!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);


    const user = new User({
        username,
        email,
        password: hashPassword
    });



    try {
        
        await user.save();

        return res.status(500).json({ user, message: "User Created!"});
    } catch (e) {
        return res.status(500).json({message: "Server Error!"});
    }
}

export const signin = async (req, res) =>{
    const {email, password} = req.body;

    try {
    
        if(email === "" || password === ""){
            return res.status(404).json({message: "Field must not be empty!"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({message: "Password does not match!"});
        }

        
        return res.status(201).json({
            user,
            token: generateToken(user._id),
        });

        
    } catch (e) {
        return res.status(500).json({message: "Invalid creadential!"});
    }
}