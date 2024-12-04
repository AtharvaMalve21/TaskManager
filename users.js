const express = require("express");
const router = express.Router();
const { signup } = require("../controller/signup");
const { login } = require("../controller/login");
const {sendotp} = require("../utils/mailSender") ;

const {changePassword} = require("../utils/mailSender");

router.get("/", (req, res) => {
  res.json({
    message: "This route is only for users",
  });
});

//signup route
router.post("/signup", signup);

//login route
router.post("/login", login);

//sendotp
router.post("/sendotp",sendotp) ;

//changePassword
router.post("/changepassword",changePassword);

module.exports = router;
