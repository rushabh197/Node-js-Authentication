
const User=require('../models/User')

const bcrypt=require('bcrypt')
//register controoler
const jwt=require('jsonwebtoken')


const getAllUser=async(req,res)=>{
    const getAllUsers= await User.find()
    if(getAllUsers){
        res.status(201).json({
            data:getAllUsers
        })
        
    }
    
}
const registerUser= async (req,res)=>{
    try{
        const {username,email,role,password}=req.body;
        const userExist= await User.findOne({$or:[{username},{email}]})

        
if(userExist){
    return res.status(201).json({

       message:'user exit please try with another username or email id' 
    })
   //hash user password
  

}


     const salt=await bcrypt.genSalt(10)
   const hashPassword= await bcrypt.hash(password,salt)

   
    const newUserCreate= await User.create({username,email,password:hashPassword,role:role||'user'});
   

  if(newUserCreate){
    res.status(201).json({
        message:"user created Successfully",
        success:true,
        data:newUserCreate

    })
}
else{

    res.status(501).json({message:' user is not created'})
}




    }  
    
    catch(e){
        res.status(500).json({

            success:false,
            message:'something went wrong'
        })
        console.log(e);
        
    }

}

//login controller
const loginUser=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user= await User.findOne({username})
        const decryptPassword= bcrypt.compare(password,user.password)
        
        if(!user){
            return res.json({message:"user doesn't exist"})
        }
       
            if(!decryptPassword){

            return res.status(201).json({
                message:" invalid credentials"
            })
        

         }

         //User Token jwt(json web token)
         const accessToken=jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
         },process.env.JWT_SECRET_KEY,{expiresIn:'15m'})

res.status(200).json({success:true,
    message:'logged in sucessful',accessToken,
  
})
         
    }
    catch(e){

        res.status(500).json({

            success:false,
            message:'something went wrong'
        })
        console.log(e);
    }

}

const changePassword=async(req,res)=>{
   

    try{
        const userId=req.userInfo.userId
         const user=await User.findById(userId)
     const {oldPassword,newPassword}=req.body;
     if(!user){
        return res.status(400).json({

            success:false,
            message:'User not found'
        })
     }

     else{
        console.log(user);
        
     }
     const isPasswordMatch= await bcrypt.compare(oldPassword,user.password)
     if(!isPasswordMatch){
         return res.status(400).json({

            success:false,
            message:'old password is incorrect! please try again'
        })
        
     }

     const salt=await bcrypt.genSalt(10);
     const newHshPassword= await bcrypt.hash(newPassword,salt)
     user.password=newHshPassword
     await user.save();
     res.status(200).json({
        success:true,
        message:"Password changed successfully"
     })

    }
    catch(e){
         res.status(500).json({

            success:false,
            message:'something went wrong'

        })

        console.log(e);
        
    }

}

module.exports={registerUser,loginUser,getAllUser,changePassword}