
const express=require('express')
const router=express.Router()
//all routes are related to authentication
const {loginUser,registerUser,getAllUser, changePassword}=require('../controller/auth-controller')
router.post('/register',registerUser)
router.post('/login',loginUser)
const authMiddelware=require('../middleware/auth-middelware')

router.get('/get',getAllUser)
router.post('/change-password',authMiddelware,changePassword)





module.exports=router