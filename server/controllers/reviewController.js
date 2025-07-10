import Instructor from "../models/InstructorSchema.js";
import Review from "../models/ReviewSchema.js";
import ReviewSchema from "../models/ReviewSchema.js";
import User from "../models/UserSchema.js";



export const addReview = async (req, res) => {
  try {
    const { instructorId, rating, comment } = req.body;
    const userId = req.user._id;

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) return res.status(404).json({ message: "Instructor not found" });

    // Optional: Check if user already reviewed
    const existingReview = await ReviewSchema.findOne({ user: userId, instructor: instructorId });
    if (existingReview) {
      return res.status(400).json({ message: "You already submitted a review" });
    }

    const review = await ReviewSchema.create({ user: userId, instructor: instructorId, rating, comment });

    instructor.reviews.push(review._id);
    await instructor.save();

    // 🔄 Recalculate average rating
    const allReviews = await ReviewSchema.find({ instructor: instructorId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    instructor.averageRating = avgRating.toFixed(1);
    await instructor.save();

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInstructorReviews = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const reviews = await ReviewSchema.find({ instructor: instructorId })
      .populate("user", "name profileImage") // Show user name, profile
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const submitReview = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ this assumes you're using the protect middleware
    const { instructorId, rating, comment } = req.body;

    if (!instructorId || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if instructor exists
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Prevent duplicate review (optional)
    const alreadyReviewed = await Review.findOne({ user: userId, instructor: instructorId });
    if (alreadyReviewed) {
      return res.status(400).json({ error: "You have already reviewed this instructor" });
    }

    // Create review
    const review = new Review({
      user: userId,
      instructor: instructorId,
      rating,
      comment,
    });

    await review.save();

    // Add review to instructor
    instructor.reviews.push(review._id);
    
    // Update averageRating
    const allReviews = await Review.find({ instructor: instructorId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    instructor.averageRating = totalRating / allReviews.length;

    await instructor.save();

    // Add to user's reviewsGiven
    await User.findByIdAndUpdate(userId, {
      $push: { reviewsGiven: review._id },
    });

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error); // ✅ Show error
    res.status(500).json({ error: "Internal server error" });
  }
};
