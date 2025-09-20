const express=require('express')
const authMiddelware=require('../middleware/auth-middelware')
const router=express.Router()
const adminMiddleware=require('../middleware/admin-middleware')
router.get('/welcome',authMiddelware,adminMiddleware,(req,res)=>{

    res.json({
        message:'Welcoome to admin page'
    })
})

module.exports=router