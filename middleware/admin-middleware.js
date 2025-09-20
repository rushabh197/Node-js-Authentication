
const isAdminUser=(req,res,next)=>{
    const {role}=req.userInfo;
    if(role!=="admin"){
res.json({success:false,message:'access denied ! admin right reserved'})
    }
next()
}
module.exports=isAdminUser