const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    //generate a token from bearer token

    const token = await req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token does not exists",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    //find a user

    const user = await User.findOne({ _id: decode._id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not found",
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
