import bcrypt from 'bcrypt';
import multer from "multer";
import Instructor from '../models/InstructorSchema.js';
import sendEmail from './utility/sendMail.js';
import User from '../models/UserSchema.js';
import Class from '../models/ClassSchema.js';
import YogaAsana from '../models/yogaAsanaSchema.js';
import cloudinary from '../config/cloudinary.js';

import streamifier from "streamifier";


const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createInstructor = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await Instructor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Instructor already exists" });
    }

    // 🔐 Generate random password
    const plainPassword = Math.random().toString(36).slice(-8); // 8-char random password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newInstructor = new Instructor({
      name,
      email,
      password: hashedPassword,
    });

    await newInstructor.save();

    // ✉️ Send Email
    const subject = "Your Yoga Instructor Login Credentials";
    const text = `Hello ${name},\n\nWelcome to the platform!\n\nLogin using:\nEmail: ${email}\nPassword: ${plainPassword}\n\nPlease log in and change your password immediately.\n\nRegards,\nAdmin`;

    await sendEmail(email, subject, text);

    res.status(201).json({ message: "Instructor created and email sent" });
  } catch (err) {
    console.error("Instructor creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//For getting All User 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // omit password field
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};


export const getAllClasses = async (req, res) => {
  try {
    // Option 1: Get all classes and populate instructor info (if referenced)
    const classes = await Class.find().populate('instructor', 'name email'); // adjust key if needed

    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error('Error fetching all classes:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching classes' });
  }
};


// Upload controller
export const uploadAsana = async (req, res) => {
  try {
    const {
      name,
      description,
      benefits,
      steps,
      precautions,
      difficulty,
      category,
      createdBy, // optional: pass admin id
    } = req.body;

    const files = req.files;

    // Validate
    if (!name || !files || files.length === 0) {
      return res.status(400).json({ error: "Name and at least one image are required." });
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload_stream({
        resource_type: "image",
        folder: "yoga-asanas",
      }, (error, result) => {
        if (error) throw error;
        imageUrls.push(result.secure_url);
      });

      // Pipe buffer to Cloudinary stream
      streamifier.createReadStream(file.buffer).pipe(result);
    }

    // Save to DB
    const newAsana = new YogaAsana({
      name,
      description,
      benefits: benefits ? JSON.parse(benefits) : [],
      steps: steps ? JSON.parse(steps) : [],
      precautions: precautions ? JSON.parse(precautions) : [],
      difficulty,
      category,
      images: imageUrls,
      createdBy,
    });

    await newAsana.save();

    res.status(201).json({
      message: "Yoga Asana uploaded successfully",
      asana: newAsana,
    });

  } catch (error) {
    console.error("Asana upload failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



