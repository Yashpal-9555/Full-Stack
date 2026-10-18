// User signup

import cloudinary from "../config/cloudinary.js";
import { generateToken } from "../config/utils.js";
import User from "../Models/User.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Detail" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Account already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio,
        });

        const token = generateToken(newUser._id);

        return res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// Controller login a user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "invalid credentials" });
        }

        const token = generateToken(userData._id);

        return res.json({ success: true, userData, token, message: "Login successfully" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// Controller to check user authenticated

export const checkAuth = (req, res) => {
    return res.json({ success: true, user: req.user });
};

// Controller to update user profile detail

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
        } else {
            const upload = await cloudinary.uploader.unsigned_upload(profilePic, "ml_default");
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            );
        }

        return res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Profile update failed:", {
            name: error.name,
            httpCode: error.http_code,
            message: error.message,
        });

        if (error.http_code === 403) {
            return res.status(502).json({
                success: false,
                message: "Cloudinary denied the image upload (403). Check that this Cloudinary account and API key are allowed to upload images.",
            });
        }

        return res.status(500).json({ success: false, message: error.message });
    }
};