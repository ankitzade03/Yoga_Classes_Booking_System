import mongoose from "mongoose";

const yogaAsanaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  benefits: [String],
  steps: [String],
  precautions: [String],
  difficulty: String,
  category: { type: String }, // 👈 Add this field
  images: [String], // ⬅️ Store up to 4 image URLs here (from Cloudinary or local storage)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

});

const YogaAsana = mongoose.model("YogaAsana", yogaAsanaSchema);
export default YogaAsana;

