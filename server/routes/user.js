const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const { 
    listUsers, 
    changStatus, 
    changRole,
    userCart,
    listuserCart,
    emtyCart,
    saveAddress,
    saveOrder,
    listOrder
 } = require('../controllers/user')

router.get('/users' , authCheck , adminCheck, listUsers)
router.post('/change-status', authCheck , adminCheck, changStatus)
router.post('/change-role', authCheck , adminCheck, changRole)

router.post('/user/cart', authCheck , userCart)
router.get('/user/cart', authCheck , listuserCart)
router.delete('/user/cart' , authCheck , emtyCart)

router.post('/user/address' , authCheck , saveAddress)


router.post('/user/order' , authCheck ,saveOrder)
router.get('/user/order', authCheck , listOrder)



module.exports = router