const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    //fetch the user details
    const { username, email, password } = req.body;

    //validate user details
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required.",
      });
    }

    //check for existing user
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    //create a new user and store entry in db

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      data: newUser,
      message: "New user created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error. Please try again later",
    });
  }
};
