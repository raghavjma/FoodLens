import bcryptjs from "bcryptjs";
import crypto from "crypto";

import {User} from "../models/User.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import {sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail, sendResetSuccessEmail} from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const {email, password, name} = req.body;
  try {
    if(!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists) {
      return res.status(400).json({success: false, message:"User already exists"});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const User = ({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000 // 1 hour
    })

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(400).json({success: false, message: error.message});
  }
};

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificcationTokenExpiresAt: {$gt: Date.now()}
    })
    if(!user) {
      return res.status(400).json({success: false, message: "Invalid or expired verification code"});
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificcationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    console.error("Error in verifyEmail: ", error);
    res.status(500).json({success: false, message: "Server error"});
    }
  };

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) {
      res.status(400).json({success: false, message: "No user with this email id exists"});
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if(!isPasswordValid){
      res.status(400).json({success: false, message: "Invalid password"});
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({success: true, message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.error("Error in login: ", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success:true, message: "Logged out successfully"});
}

export const forgotPassword = async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: "User with this email does not exist"});
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendResetPasswordEmail(user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);

    res.status(200).json({success: true, message: "Password reset link sent to your email"});
  } catch (error) {
    console.error("Error in forgotPassword: ", error);
    res.status(400).json({success: false, message: error.message});
  }
};

export const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {$gt: Date.now()}
    });

    if(!user){
      return res.status(400).json({success: false, message: "Invalid or expired password reset token"});
    };

    const hashedpassword = await bcryptjs(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({success: true, message: "Password has been reset successfully"});
  } catch (error) {
    console.log("Error in resetPassword: ", error);
    res.status(400).json({success: false, message: error.message});
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if(!user){
      return res.status(400).json({success: false, message: "User not found"});
    }

    res.status(200).json({success: true, user});
  } catch (error) {
    console.error("Error in checkAuth: ", error);
    res.status(400).json({success: false, message: error.message});
  }
};