// import
const express = require('express');
const router = express.Router();

// import controller
const { changeOrderStatus, listOrderAdmin} = require('../controllers/admin');
const { listUsers } = require('../controllers/user');

// middleware
const { authCheck } = require("../middlewares/authCheck")

router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, listOrderAdmin)


module.exports =router;