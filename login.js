const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res) => {
  try {
    //fetch the email && password for a user
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Fill all the required fields",
      });
    }

    //check for existing user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }

    //check the password
    const validatePassword = await bcrypt.compare(password, user.password);

    if (validatePassword) {
      res.status(404).json({
        success: false,
        message: "Invalid login credentials",
      });
    }

    //generate a token

    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      user,
      token,
      message: "User is successfully logged in",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
