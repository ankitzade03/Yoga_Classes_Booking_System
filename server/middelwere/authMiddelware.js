import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID and role to request object
    req.user = {
      _id: decoded.id,
      role: decoded.role // optional if you're storing role in token
    };

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


// middleware/isAdmin.js
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // ✅ Allow
  } else {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
};


export const isInstructor = (req, res, next) => {
  try {
    if (req.user && req.user.role === "instructor") {
      next(); // ✅ Allowed
    } else {
      return res.status(403).json({ message: "Access denied. Instructor only." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const isUser = (req, res, next) => {
  try {
    if (req.user && req.user.role === "user") {
      next(); // ✅ User has access
    } else {
      return res.status(403).json({ message: "Access denied. Users only." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // ✅ sets req.user

      next();
    } catch (error) {
      console.error("Auth failed:", error);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};
