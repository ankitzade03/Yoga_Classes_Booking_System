import cloudinary from 'cloudinary';
import Class from "../models/ClassSchema.js";
import Instructor from "../models/InstructorSchema.js";
import User from '../models/UserSchema.js';
export const createClass = async (req, res) => {
  try {
    const instructorId = req.user._id; // From JWT, ensure the token is of instructor
    const {
      className,
      description,
      schedule,
      isOnline,
      meetingLink,
      location,
      maxStudents,
      price
    } = req.body;

    // Check if the instructor exists
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Create the new class
    const newClass = new Class({
      instructor: instructorId,
      className,
      description,
      schedule,
      isOnline,
      meetingLink: isOnline ? meetingLink : "",
      location: isOnline ? "" : location,
      maxStudents,
      price
    });

    const savedClass = await newClass.save();

    // Push the class into instructor's classesCreated array
    instructor.classesCreated.push(savedClass._id);
    await instructor.save();

    res.status(201).json({
      message: "Class created successfully",
      class: savedClass
    });
  } catch (error) {
    console.error("Create class error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get Classes by instructor
export const getInstructorClasses = async (req, res) => {
  try {
    const instructorId = req.user._id; // From JWT (make sure it's instructor)

    const classes = await Class.find({ instructor: instructorId }).populate("enrolledStudents", "username email");

    res.status(200).json({
      message: "Classes fetched successfully",
      classes,
    });
  } catch (error) {
    console.error("Error fetching instructor classes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const gettingUpcommingClasses = async (req, res) => {
  try {
    const currentDate = new Date();

    const classes = await Class.find({ schedule: { $gte: currentDate } })
      .sort({ schedule: 1 }) // Sort by upcoming date
      .populate("instructor", "name email profilePic"); // Optional instructor details

    res.status(200).json({
      message: "Upcoming classes fetched successfully",
      classes,
    });
  } catch (error) {
    console.error("Error fetching upcoming classes:", error.message);
    res.status(500).json({ message: "Server error while fetching classes" });
  }
};

//get all instructor on the front page

export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().select("-password"); // exclude password
    res.status(200).json({ instructors });
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//getting current Instructor profile

export const getCurrentInstructorProfile = async (req, res) => {
  try {
    const instructorId = req.user._id; // ✅ comes from JWT token after verifyToken middleware

    const instructor = await Instructor.findById(instructorId).select("-password");

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Instructor profile fetched successfully",
      instructor,
    });
  } catch (error) {
    console.error("Error fetching instructor profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// configure cloudinary if not globally

cloudinary.v2.config({
  cloud_name:"dkhxqvhlt",
  api_key:"418184227249772",
  api_secret:"lvj4QoGiPQVY4v_pS1tvaIkP02A",
});
 

export const updateInstructorProfile = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    // ✅ Upload profile image to Cloudinary
    if (req.files?.image1?.[0]) {
      const imageBuffer = req.files.image1[0].buffer;

      const imageUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'instructors/profile'
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(imageBuffer);
      });

      instructor.profileImage = imageUpload.secure_url;
    }

    // ✅ Upload demo video to Cloudinary
    if (req.files?.video1?.[0]) {
      const videoBuffer = req.files.video1[0].buffer;

      const videoUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'instructors/videos'
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(videoBuffer);
      });

      instructor.demoVideoURL = videoUpload.secure_url;
    }

    // ✅ Basic field updates
    const {
      name,
      location,
      whatsappNumber,
      expertiseAreas,
      languagesSpoken,
      availability,
    } = req.body;

    if (name) instructor.name = name;
    if (location) instructor.location = location;
    if (whatsappNumber) instructor.whatsappNumber = whatsappNumber;

    if (expertiseAreas) {
      instructor.expertiseAreas = expertiseAreas.split(',').map(i => i.trim());
    }

    if (languagesSpoken) {
      instructor.languagesSpoken = languagesSpoken.split(',').map(i => i.trim());
    }

    if (availability) {
      instructor.availability = availability.split(',').map(entry => {
        const [day, time] = entry.split(':');
        return { day: day.trim(), time: time.trim() };
      });
    }

    await instructor.save();

    res.status(200).json({
      success: true,
      message: 'Instructor profile updated successfully',
      instructor,
    });
  } catch (error) {
    console.error('Error updating instructor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

//Getting Endrolled Student by the Instructor

export const getEnrolledStudentsByInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    // Step 1: Find all classes created by this instructor
    const classes = await Class.find({ instructor: instructorId })
      .populate("enrolledStudents", "name email profileImage") // only get necessary fields
      .select("className enrolledStudents");

    res.status(200).json({
      message: "Enrolled students fetched successfully",
      classes, // each class includes className + list of enrolledStudents
    });

  } catch (error) {
    console.error("❌ Error fetching enrolled students:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getEnrolledStudents = async (req, res) => {
  try {
    const instructorId = req.user._id; // From the auth middleware

    // Find all classes by this instructor
    const classes = await Class.find({ instructor: instructorId })
      .populate({
        path: 'enrolledStudents',
        select: 'name email profileImage',
      })
      .select('className enrolledStudents'); // Keep only what we need

    res.status(200).json({
      message: 'Enrolled students fetched successfully',
      classes,
    });
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const removeStudentFromClass = async (req, res) => {
  const { classId, studentId } = req.params;

  try {
    const yogaClass = await Class.findById(classId);
    if (!yogaClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    yogaClass.enrolledStudents = yogaClass.enrolledStudents.filter(
      (student) => student._id.toString() !== studentId
    );

    await yogaClass.save();

    res.status(200).json({ message: 'Student removed successfully' });
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT: Edit student details
export const editStudentDetails = async (req, res) => {
  const { studentId } = req.params;
  const { name, email, profileImage } = req.body;

  try {
    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({ message: 'Student updated successfully', user });
  } catch (error) {
    console.error('Error editing student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
