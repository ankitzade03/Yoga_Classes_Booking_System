import Contact from "../models/ContactSchema.js";



// 🔹 User submits question
export const submitQuestion = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contactEntry = new Contact({ name, email, message });
    await contactEntry.save();

    res.status(201).json({ message: 'Your query has been submitted successfully' });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔹 Admin gets all queries
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Fetched all user queries', questions });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
