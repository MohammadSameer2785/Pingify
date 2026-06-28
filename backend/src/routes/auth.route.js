import express from "express";
import { signup,login,logout,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjectProtection } from "../middleware/arcjet.middleware.js";
const router=express.Router();

//router.use(arcjectProtection); can be used for once

router.get("/login",arcjectProtection,login)
router.post("/signup",arcjectProtection,signup)
router.post("/logout",arcjectProtection,logout)
router.put("/update-profile",arcjectProtection,protectRoute,updateProfile)
router.get("/check",protectRoute,(req,res)=>{
    res.status(200).json(req.user); 
})
export default router;