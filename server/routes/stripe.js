// import
const express = require('express');
const router = express.Router();
// middleware
const { authCheck } = require("../middlewares/authCheck")

// improt controll
const { setpayment } = require ('../controllers/stripe');

router.post('/user/create-checkout-session', authCheck, setpayment)


module.exports =router;