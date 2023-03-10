const express = require("express");
const {
  signupEmail,
  signupPhone,
  signupGoogle,
  signupWallet,
  loginUsername,
  loginEmail,
  loginPhone,
  loginGoogle,
  loginWallet,
} = require("../controllers/auth.js");
const { sendOTP, verifyOTP } = require("../utils/sms.js");

const router = express.Router();

/* VERIFY */
router.post("/verify/username", loginUsername);
router.post("/verify/email", loginUsername);
router.post("/verify/phone", loginUsername);
router.post("/verify/token", loginUsername);

/* VALIDATE */
router.post("/validate/username", loginUsername);
router.post("/validate/email", loginUsername);
router.post("/validate/phone", loginUsername);
router.post("/validate/token", loginUsername);

/* SIGNUP */
router.post("/signup/email", signupEmail);
router.post("/signup/phone", signupPhone);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/signup/google", signupGoogle);
router.post("/signup/wallet", signupWallet);

/* LOGIN */
// router.get("/login", loginMethods);
router.post("/login/username", loginUsername);
router.post("/login/email", loginEmail);
router.post("/login/phone", loginPhone);
router.post("/login/google", loginGoogle);
router.post("/login/wallet", loginWallet);

/* FORGET */
router.post("/forget", loginUsername);

module.exports = router;
