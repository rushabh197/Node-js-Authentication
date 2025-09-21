
const mongoose=require('mongoose')
require('dotenv').config()
const  connectToDB= async()=>{
    const MONGO_CONNECT=process.env.MONGO_CONNECT1;
    try{

 await mongoose.connect(MONGO_CONNECT)

 console.log('connection successfully');
 
    }catch(e){

        console.log(e);
        process.exit(1);

        
    }
    

}
module.exports=connectToDB;
