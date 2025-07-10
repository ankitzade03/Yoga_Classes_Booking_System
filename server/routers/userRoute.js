// routes/uploadRoutes.js
import express from 'express';

import {addInstructorReview,getAllInstructors, getClassDetails, getCurrentUserProfile,getInstructorById, getJoinedClasses, joinClass, updateUserProfile } from '../controllers/userController.js';
import { isUser, protect, verifyToken } from '../middelwere/authMiddelware.js';
import {getAllYogaAsanas, getYogaAsanaById, getYogaAsanasFiltered } from '../controllers/yogaAsans.js';
import { upload } from '../middelwere/multer.js';
import { submitReview } from '../controllers/reviewController.js';



const router = express.Router();

router.get("/userprofile/me", verifyToken, getCurrentUserProfile);

// ✅ PUT route to update user profile
router.put(
  '/userprofile/update-profile',
  verifyToken,                     // Check if user is logged in
  upload.single('image1'), // Handle image upload
  updateUserProfile                // Controller
);

//geting all instructor on front page 
router.get("/instructors", getAllInstructors);

//induvidual instrutor information 
router.get("/instructor/:id", getInstructorById);

router.get("/class/:id", getClassDetails);

router.post('/class/join/:id',verifyToken ,joinClass); // ✅ This must match frontend URL


router.post("/user-review",protect,submitReview)

//add review System 
router.post('/instructor/:instructorId/review', verifyToken, addInstructorReview);


// // Public
router.get("/yogasan/all", getAllYogaAsanas);

router.get("/yogasan/:id", getYogaAsanaById);

//Filter the Asans by Category or Difficulty level
router.get("/yogasan/filter",getYogaAsanasFiltered);

router.get("/joined-classes", verifyToken, getJoinedClasses);

export default router;
6