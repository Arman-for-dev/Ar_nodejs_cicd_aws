import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "7d"})
}

export const verifyToken = asyncHandler ( async ( req,res, next) =>{
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");

            next();
        } catch (e) {
            res.send(401).json({message: "Not Authorized!"});
        }
    }
    if(!token){
        res.status(401).json({message: "Not authorized token"})
    }

});