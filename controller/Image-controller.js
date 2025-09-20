
const Image=require('../models/Image')
const {uploadToCloudinary}= require('../helpers/cloudinaryHelpers')
const fs=require('fs')

const cloudinary=require('../config/cloudinary')

const uploadImageController=async(req,res)=>{
    try{

        const {url,publicId}=await uploadToCloudinary(req.file.path)

const newlyUploadedImage= await Image.create({url,publicId,
uploadedBy:req.userInfo.userId

})
fs.unlinkSync(req.file.path)
if(newlyUploadedImage){
    res.status(200).json({
        success:true,
        message:'Image is created successfully',
        image:newlyUploadedImage
    })
}

//if file is missing
if(!req.file){
    return res.status(400).json({ success:false,
        message:'file not found'})
}
    }
    catch(e){

        res.status(500).json({
            success:false,
            message:'file is required,Please upload an image'
        })
        
    }

}

const fetchImageController=async (req,res)=>{
    try{
    const images=await Image.find()
    if(images){
        res.status(200).json({
            images:images,
            count:images.length
        })
    }
}
catch(e){
    res.status(500).json({
            success:false,
            message:'no images found'
        })

}
}

const deleteImageController=async(req,res)=>{
    try{
const imageId=req.params.id;
const userId=req.userInfo.userId;
const image=await Image.findById(imageId)

if(!image){
    res.status(500).json({
            success:false,
            message:'no image found'
        })

}

if(image.uploadedBy.toString()!==userId){
   res.status(500).json({
            success:false,
            message:'your are not authorized'
        })
  
}

await cloudinary.uploader.destroy(image.publicId)
 const deleteImage=await Image.findByIdAndDelete(imageId)
 res.status(500).json({
            success:true,
            message:'image deleted successfully',
            deletedimage:deleteImage
        })


    }
    catch(e){
    res.status(500).json({
            success:false,
            message:'no images found'
        })

}}

module.exports={uploadImageController,fetchImageController,deleteImageController}