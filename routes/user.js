import express from "express";
import { verifyToken } from "../utils/token.js";
import { getLoggedUser } from "../controllers/user.controller.js";


const route = express.Router();

route.get("/me", verifyToken,  getLoggedUser);



export default route;