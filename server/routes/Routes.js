const express = require('express');
const { otpSender, signUp, LoginOtp, Login, logout} = require('../controller/Auth');
const { resetPasswordToken, resetPassword } = require('../controller/resetpassword');
const { capturePayment, verifySignature } = require('../controller/payment');
const { auth } = require('../middlewares/auth');
const { getplan } = require('../controller/Plan');
const { checkplan } = require('../controller/checkplan');
const { contact } = require('../controller/contact');
const { support } = require('../controller/support');
const { dashboard } = require('../controller/dashboard');
const { totalsecurity , basicdefence,internetsecurity } = require('../controller/downloadlink');
const {capturePayPalPayment, verifyPayPalPayment} = require("../controller/paypal");
const {getPublicConfig} = require("../controller/configController")
const router = express.Router();

router.post("/otpsender",otpSender);
router.post("/signUp",signUp);
router.post("/otplogin",LoginOtp);
router.post("/login",Login);
router.post("/logout",logout);

router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);


router.post("/capturePayment",capturePayment);
router.post("/verifySignature",verifySignature);

router.post("/create-order", capturePayPalPayment);
router.post("/verify", verifyPayPalPayment);

router.get("/config", getPublicConfig);


router.post("/getplan",getplan);

router.post("/contact",contact);

router.post("/support",support);

router.post("/checkplan",auth,checkplan);

router.get("/dashboard",auth,dashboard);
router.get("/download/totalsecurity",totalsecurity)
router.get("/download/basicdefence",basicdefence)
router.get("/download/internetsecurity",internetsecurity)

module.exports = router;
