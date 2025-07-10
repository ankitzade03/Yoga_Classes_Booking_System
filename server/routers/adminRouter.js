import express from 'express';
import {createInstructor, getAllClasses, getAllUsers} from '../controllers/adminController.js'
import { isAdmin, verifyToken } from '../middelwere/authMiddelware.js';
import { getAllInstructors } from '../controllers/userController.js';
import { createYogaAsana, getAllYogaAsanas } from '../controllers/yogaAsans.js';
import { upload } from '../middelwere/multer.js';

const router = express.Router();

//instructor creation
router.post('/create_instructor', createInstructor);


// GET all users
router.get('/users',verifyToken, getAllUsers);

// GET all instructors
router.get('/instructors',verifyToken, getAllInstructors);

//get All Classes
router.get('/get-all-class',verifyToken, getAllClasses);
    

// // Asans Facility Admin-only
router.post(
  "/yogasan/create",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createYogaAsana
);

router.get('/all',verifyToken, getAllYogaAsanas);


export default router;
