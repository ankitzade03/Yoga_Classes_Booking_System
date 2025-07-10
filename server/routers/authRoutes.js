import express from "express";
import {adminLogin, loginUserOrInstructor, registerUser } from "../controllers/authControler.js";


const router = express.Router();

router.post("/register", registerUser); // only users register
router.post("/login", loginUserOrInstructor); // login for both
router.post('/adminLogin',adminLogin)  //login for admin

export default router;

