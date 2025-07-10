import express from 'express';
import { getAllQuestions, submitQuestion } from '../controllers/contactController.js';
import { isAdmin } from '../middelwere/authMiddelware.js';

const router = express.Router();

// Route to submit form
router.post('/submit', submitQuestion);

// Route for admin to get all queries
router.get('/all',isAdmin, getAllQuestions);

export default router;
