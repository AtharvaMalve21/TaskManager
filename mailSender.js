const nodemailer = require("nodemailer");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.HOST_PASS,
  },
});

//send otp
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(Math.random() * 90000);

    const mailOptions = {
      from: process.env.HOST_MAIL,
      to: email,
      subject: "OTP for Verification",
      text: `Your OTP for verification is ${otp}`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
      } else {
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User is not found.",
          });
        } else {
          user.otp = otp;
        }
        await user.save();
        console.log(otp);

        res.status(200).json({
          success: true,
          message: "OTP sent successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error.",
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP. Please verfiy the OTP",
      });
    }

    user.password = newpassword;
    user.otp = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
