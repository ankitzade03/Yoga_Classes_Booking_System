

import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  className: { type: String, required: true },
  description: String,
  schedule: Date,
  isOnline: { type: Boolean, default: false },
  meetingLink: String, // Optional if isOnline = true
  location: String,    // Optional if isOnline = true
  maxStudents: { type: Number, required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  price: Number
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ Add a virtual classId field to expose _id as classId
classSchema.virtual('classId').get(function () {
  return this._id.toHexString();
});

const Class = mongoose.model('Class', classSchema);

export default Class;
