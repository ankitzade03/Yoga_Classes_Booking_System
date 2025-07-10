import cloudinary from "../config/cloudinary.js";
import Class from "../models/ClassSchema.js";
import User from "../models/UserSchema.js";
import YogaAsana from "../models/yogaAsanaSchema.js";

export const createYogaAsana = async (req, res) => {
  try {
    const {
      name,
      description,
      benefits,
      steps,
      precautions,
      videoUrl,
      category
    } = req.body;

    const imageFiles = req.files;
    const imageUrls = [];

    for (let i = 1; i <= 4; i++) {
      const file = imageFiles[`image${i}`]?.[0];
      if (file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "asanas" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(file.buffer); // use .buffer since memoryStorage
        });

        imageUrls.push(result.secure_url);
      }
    }

    const newAsana = new YogaAsana({
      name,
      description,
      videoUrl,
      category,
      benefits: JSON.parse(benefits),
      steps: JSON.parse(steps),
      precautions: JSON.parse(precautions),
      images: imageUrls,
    });

    await newAsana.save();
    res.status(201).json({ message: "Yoga Asana created", asana: newAsana });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: "Server error while creating Yogasan", error: error.message });
  }
};



export const deleteYogaAsana = async (req, res) => {
  try {
    const asanaId = req.params.id;

    const deletedAsana = await YogaAsana.findByIdAndDelete(asanaId);

    if (!deletedAsana) {
      return res.status(404).json({ message: "Yogasan not found" });
    }

    res.status(200).json({ message: "Yogasan deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting Yogasan" });
  }
};

//getting all the Asans for all the Users..

// import YogaAsana from "../models/YogaAsana.js"; // adjust path as needed

export const getAllYogaAsanas = async (req, res) => {
  try {
    // Optional: sort by createdAt descending (newest first)
    const yogasans = await YogaAsana.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All Yoga Asanas fetched successfully",
      count: yogasans.length,
      data: yogasans,
    });
  } catch (error) {
    console.error("Error fetching Yoga Asanas:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getYogaAsanaById = async (req, res) => {
  try {
    const { id } = req.body;

    const yogasan = await YogaAsana.findById(id);

    if (!yogasan) {
      return res.status(404).json({ message: "Yoga Asana not found" });
    }

    res.status(200).json({
      message: "Yoga Asana fetched successfully",
      data: yogasan,
    });
  } catch (error) {
    console.error("Error fetching Yoga Asana by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getYogaAsanasFiltered = async (req, res) => {
  try {
    const { categories, benefits, difficulty } = req.query;

    const filter = {};

    // 🔎 Filter by category
    if (categories) {
      const categoryList = categories.split(",");
      filter.category = { $in: categoryList };
    }

    // 🔎 Filter by benefits
    if (benefits) {
      const benefitList = benefits.split(",");
      filter.benefits = { $in: benefitList };
    }

    // 🔎 Filter by difficulty
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const yogasans = await YogaAsana.find(filter);
    res.status(200).json(yogasans);

  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const bookClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const userId = req.user._id;

    const foundClass = await Class.findById(classId).populate("instructor", "name email");
    const user = await User.findById(userId);

    if (!foundClass || !user) return res.status(404).json({ message: "Class or user not found" });

    if (foundClass.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    if (foundClass.enrolledStudents.length >= foundClass.maxStudents) {
      return res.status(400).json({ message: "Class is full" });
    }

    foundClass.enrolledStudents.push(userId);
    await foundClass.save();

    // ✅ Send email to user
    const subject = "Class Booking Confirmation";
    const text = `
Hi ${user.name || "Yoga Enthusiast"}, 

You have successfully booked the following class:

🧘 Class: ${foundClass.className}
🧑‍🏫 Instructor: ${foundClass.instructor.name}
📅 Date: ${new Date(foundClass.schedule).toLocaleString()}
💵 Price: ₹${foundClass.price || 0}

We look forward to seeing you there!
- Yoga Class Team
`;

    await sendEmail(user.email, subject, text);

    res.status(200).json({ message: "Class booked and confirmation email sent" });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

