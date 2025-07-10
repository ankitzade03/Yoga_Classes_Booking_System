import express from "express";
import { createClass, editStudentDetails, getCurrentInstructorProfile, getEnrolledStudents, getEnrolledStudentsByInstructor, getInstructorClasses, removeStudentFromClass, updateInstructorProfile } from "../controllers/instructorController.js";

import { isInstructor, verifyToken } from "../middelwere/authMiddelware.js";
import { upload } from "../middelwere/multer.js";




const router = express.Router();

//getting the current insgtructor information
router.get("/instructor_profile", verifyToken, isInstructor, getCurrentInstructorProfile);

// create class by Instructor
router.get('/instructors/create_class',verifyToken,createClass);

//get all classes by instructor
router.get("/instructor/classes", verifyToken, getInstructorClasses);

router.put(
  "/profile/update",
  verifyToken,
  isInstructor,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "video1", maxCount: 1 },
  ]),
  updateInstructorProfile
);

router.get('/enrolled-students',verifyToken, getEnrolledStudents);


// DELETE student from class
router.delete(
  '/enrolled-students/:classId/:studentId',
  verifyToken,
  removeStudentFromClass
);

// EDIT student data
router.put(
  '/enrolled-students/:studentId',
  verifyToken,
  editStudentDetails
);

export default router;
