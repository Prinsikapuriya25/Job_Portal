import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { get } from "http";
import jwt from "jsonwebtoken";
import getDataUri from "../Utils/datauri.js";
import cloudinary from "../Utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, role, password } = req.body;

    if (!fullname || !email || !phoneNumber || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required",
        success: false,
      });
    }
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    //Check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "365d",
    });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      createdAt: user.createdAt,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;

    let skillsArray = [];

    // HANDLE SKILLS

    if (skills) {
      const normalizedSkills =
        typeof skills === "string" && skills.trim().startsWith("[")
          ? JSON.parse(skills)
          : skills;

      skillsArray = (
        Array.isArray(normalizedSkills)
          ? normalizedSkills
          : String(normalizedSkills).split(",")
      )
        .map((skill) => String(skill).trim())
        .filter(Boolean);
    }

    const userId = req.userId;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // SAFE PROFILE OBJECT

    if (!user.profile) {
      user.profile = {};
    }

    // UPDATE USER DETAILS

    if (fullname) {
      user.fullname = fullname;
    }

    // EMAIL VALIDATION

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          message: "Email already in use",
          success: false,
        });
      }

      user.email = email;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    if (bio) {
      user.profile.bio = bio;
    }

    if (skills) {
      user.profile.skills = skillsArray;
    }

    // RESUME UPLOAD

    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
      });

      user.profile.resume = cloudResponse.secure_url;

      user.profile.resumeOriginalName = file.originalname;
    }

    // SAVE USER

    await user.save();

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userData,
      success: true,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR => ", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user || !user.profile || !user.profile.resume) {
      return res.status(404).json({
        message: "Resume not found",
        success: false,
      });
    }

    return res.redirect(
      `${user.profile.resume}?fl_attachment=${user.profile.resumeOriginalName}`,
    );
  } catch (error) {
    console.log("DOWNLOAD RESUME ERROR => ", error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
