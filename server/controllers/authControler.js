// controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import Instructor from "../models/InstructorSchema.js";



export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};


export const loginUserOrInstructor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First, try to find the user
    let account = await User.findOne({ email });
    let role = "user";

    // If not found, try to find the instructor
    if (!account) {
      account = await Instructor.findOne({ email });
      role = "instructor";
    }

    if (!account) return res.status(404).json({ message: "Account not found" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Create token (JWT)
    const token = jwt.sign(
      { id: account._id, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role,
      userId: account._id,
      username: account.username
    });
    
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Compare with .env credentials
    if (
      email === process.env.ADMIN_GMAIN_ID &&
      password === process.env.ADMIN_GMAIL_PASS
    ) {
      // ✅ Generate JWT Token
      const token = jwt.sign(
        {
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "8d" } // token valid for 7 days
      );

      return res.status(200).json({
        message: "Admin login successful",
        role: "admin",
        token, // ✅ send token to frontend/Postman
      });
    } else {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error during admin login" });
  }
};
