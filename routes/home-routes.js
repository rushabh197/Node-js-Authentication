const express=require('express')

const router=express.Router()

const authMiddelware=require('../middleware/auth-middelware')

router.get('/welcome',authMiddelware,(req,res)=>{
const {username,userId,role}=req.userInfo
res.json({message:'welcome to Home Page',
    user:{

        _id:userId,
        username,
        role

    }
})
})




module.exports=router