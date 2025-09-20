const jwt=require('jsonwebtoken')
const authMiddelware=(req,res,next)=>{
const authHeader=req.headers['authorization']

const token=authHeader&& authHeader.split(' ')[1];

if(!token)
{
    return res.status(401).json({
        success:false,
        message:'access denied please try again'
    })
}

try{
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.userInfo=decodedToken
    
    next()
    console.log(decodedToken);
    


}catch(e){

     return res.status(401).json({
        success:false,
        message:'access denied'
    })

}

}

module.exports=authMiddelware;