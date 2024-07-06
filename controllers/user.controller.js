import asyncHandler from"express-async-handler";
import User from "../models/user.model.js";


export const getLoggedUser = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
});