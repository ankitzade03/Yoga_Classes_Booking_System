// controllers/uploadController.js
import mongoose from "mongoose"; // If you're using ES modules (with "type": "module" in package.json)
import cloudinary from 'cloudinary';

import User from "../models/UserSchema.js";
import Instructor from "../models/InstructorSchema.js";
import Review from "../models/ReviewSchema.js";
import Class from "../models/ClassSchema.js";
import sendEmail from './utility/sendMail.js'

// Update user/instructor profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload image if available
    if (req.files?.image1?.[0]) {
      const result = await cloudinary.uploader.upload(req.files.image1[0].path, {
        resource_type: "image",
      });
      user.profileImage = result.secure_url;
    }

    const { name, age, whatsup, bio, location, gender } = req.body;

    if (name) user.name = name;
    if (age) user.age = age;
    if (whatsup) user.whatsappNumber = whatsup;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (gender) user.gender = gender;

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user,
    });
    
  } catch (error) {
    console.error("User profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//for Getting All Instructor

export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().select('-password'); // omit password field
    res.status(200).json({ instructors });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ message: 'Server error while fetching instructors' });
  }
};

//getting induavidual instrictor information 
export const getInstructorById = async (req, res) => {
  try {
    // const instructorId =req.params._id;
    const instructorId = req.params.id; // ✅ Correct: 'id' not '_id'

 // ✅ FIXED: Extract from URL params

    const instructor = await Instructor.findById(instructorId)
      .select("-password")
      .populate("classesCreated"); // Optional: populate class info

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({ instructor });
  } catch (error) {
    console.error("Error fetching instructor by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//getting Current user Information

export const getCurrentUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Extracted from JWT in verifyToken middleware

    // Try finding in User collection
    let user = await User.findById(userId).select("-password");

    // If not found in User, check Instructor
    if (!user) {
      user = await Instructor.findById(userId).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User or Instructor not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//for Review System


export const addInstructorReview = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const userId = req.user._id; // Comes from auth middleware
    const { rating, comment } = req.body;

    // Basic validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if instructor exists
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    // Optional: Prevent duplicate reviews from same user
    const existingReview = await Review.findOne({
      instructor: instructorId,
      user: userId
    });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this instructor' });
    }

    // Create review
    const newReview = new Review({
      user: userId,
      instructor: instructorId,
      rating,
      comment
    });

    await newReview.save();

    // Optionally, push to instructor's reviews array
    instructor.reviews.push(newReview._id);
    await instructor.save();

    res.status(201).json({
      message: 'Review added successfully',
      review: newReview
    });
  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getClassDetails = async (req, res) => {
  const classId = req.params.id;
  console.log("Received class ID:", classId); // <-- Add this for debug

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    return res.status(400).json({ error: "Invalid class ID" });
  }

  const yogaClass = await Class.findById(classId).populate("instructor", "name email");
  if (!yogaClass) {
    return res.status(404).json({ error: "Class not found" });
  }

  res.status(200).json(yogaClass);
};

export const joinClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const userId = req.user._id; // ✅ From middleware (decoded token)

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ error: "Invalid class ID" });
    }

    const yogaClass = await Class.findById(classId);
    if (!yogaClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already enrolled
    if (yogaClass.enrolledStudents.includes(userId)) {
      return res.status(400).json({ error: "User already enrolled in this class" });
    }

    // Check if class is full
    if (yogaClass.enrolledStudents.length >= yogaClass.maxStudents) {
      return res.status(400).json({ error: "Class is full" });
    }

    // ✅ Enroll user
    yogaClass.enrolledStudents.push(userId);
    await yogaClass.save();

    // ✅ Update user’s enrolledClasses
    user.enrolledClasses.push(classId);
    await user.save();

    // ✅ Optional email
    await sendEmail(user.email, "Yoga Class Joined", `You have successfully joined: ${yogaClass.className}`);

    res.status(200).json({ message: "Successfully joined the class" });

  } catch (err) {
    console.error("Join class error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/userController.js

export const getMyAllClasses = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware

    // Step 1: Get the user and their enrolled classes
    const user = await User.findById(userId).populate({
      path: "enrolledClasses",
      populate: { path: "instructor", model: "Instructor" },
    });

    if (!user || user.enrolledClasses.length === 0) {
      return res.status(200).json({ message: "No classes enrolled yet", classes: [] });
    }

    // Step 2: Group by instructor
    const grouped = {};

    user.enrolledClasses.forEach((cls) => {
      const instructorId = cls.instructor._id;
      if (!grouped[instructorId]) {
        grouped[instructorId] = {
          instructor: {
            id: instructorId,
            name: cls.instructor.name,
            email: cls.instructor.email,
          },
          classes: [],
        };
      }

      grouped[instructorId].classes.push({
        classId: cls._id,
        className: cls.className,
        schedule: cls.schedule,
        isOnline: cls.isOnline,
        meetingLink: cls.meetingLink,
        location: cls.location,
        price: cls.price,
      });
    });

    const result = Object.values(grouped);

    res.status(200).json({ groupedClasses: result });
  } catch (err) {
    console.error("❌ Error fetching enrolled classes by instructor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getJoinedClasses = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ This comes from the token via middleware

    // Fetch user and populate enrolledClasses
    const user = await User.findById(userId)
      .populate({
        path: "enrolledClasses",
        populate: {
          path: "instructor",
          select: "name email profileImage"
        }
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Successfully fetched enrolled classes",
      enrolledClasses: user.enrolledClasses
    });

  } catch (error) {
    console.error("Error fetching enrolled classes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
