// // middleware/upload.js
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image and video files are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/", "video/"];
//   if (allowedTypes.some(type => file.mimetype.startsWith(type))) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image and video files are allowed"), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });

// // middleware/upload.js
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/', 'video/'];
//   const isValid = allowedTypes.some(type => file.mimetype.startsWith(type));

//   if (isValid) cb(null, true);
//   else cb(new Error('Only image and video files are allowed'), false);
// };

// export const upload = multer({ storage, fileFilter });


// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';

// // Create uploads folder if it doesn't exist
// const uploadDir = path.join('uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image and video files are allowed"), false);
//   }
// };

// // export const upload = multer({ storage, fileFilter });
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image and video files are allowed'), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });
// // middleware/upload.js
// import multer from 'multer';

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image and video files are allowed"), false);
//   }
// };

// // export const upload = multer({ storage, fileFilter });
// import multer from "multer";

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image and video files are allowed"), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });


// middleware/upload.js
import multer from 'multer';

const storage = multer.memoryStorage(); // store in memory, not on disk

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
