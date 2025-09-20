const express=require('express');

const router=express.Router();
const {fetchImageController}=require('../controller/Image-controller')
const uploadMiddleware=require('../middleware/upload-middleware')
const {uploadImageController,deleteImageController}=require('../controller/Image-controller')

const adminMiddleware=require('../middleware/admin-middleware')
const authMiddelware=require('../middleware/auth-middelware')

router.post('/upload',authMiddelware,adminMiddleware,uploadMiddleware.single('image'),uploadImageController)

router.get('/getImages',authMiddelware,fetchImageController)

router.delete('/:id',authMiddelware,adminMiddleware,deleteImageController)

module.exports=router