import express from "express";
import { isUser, verifyToken } from "../middelwere/authMiddelware";
import { addReview, getInstructorReviews } from "../controllers/reviewController";
const router = express.Router(); 

router.post("/add", verifyToken, isUser, addReview);

router.get("/instructor/:instructorId", getInstructorReviews);

export default router;
