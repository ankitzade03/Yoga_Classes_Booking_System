
import mongoose from "mongoose";

const instructorSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  location: String,
  role: {
    type: String,
    enum: ["instructor"],
    default: "instructor"
  },

  profileImage: {
    type: String,
    default: ''
  },

  whatsappNumber: String,
  demoVideoURL: String, // YouTube or Drive links
  bio: {
    type: String,
    maxlength: 1000
  },

  experience: {
    type: String // e.g., "5 years of teaching yoga"
  },

  expertiseAreas: [{
    type: String
  }], // e.g., ["Hatha Yoga", "Pranayama"]

  languagesSpoken: [{
    type: String
  }], // e.g., ["Hindi", "English"]

  availability: [
  {
    day: String,
    time: String,
  },
],


  socialLinks: {
    instagram: String,
    youtube: String,
    facebook: String
  },

  isOnline: { type: Boolean, default: false },

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  
  averageRating: { type: Number, default: 0 },

  classesCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],

  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
