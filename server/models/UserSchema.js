import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user'
  },

  name: {
    type: String
  },

  age: {
    type: Number
  },

  gender: {
    type: String
  },

  bio: {
    type: String
  },

  interests: {
    type: [String]
  },

  goals: {
    type: String
  },

  preferredTime: {
    type: String
  },

  location: {
    type: String
  },

  profileImage: {
    type: String,
    default: ''
  },

  whatsappNumber: {
    type: String
  },

  enrolledClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }
  ],

  reviewsGiven: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;
