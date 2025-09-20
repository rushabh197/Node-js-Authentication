
const mongoose=require('mongoose')
require('dotenv').config()
const  connectToDB= async()=>{
    const MONGO_CONNECT=process.env.MONGO_CONNECT;
    try{

 await mongoose.connect(MONGO_CONNECT)

 console.log('connection successful');
 
    }catch(e){

        console.log(e);
        process.exit(1);

        
    }
    

}
module.exports=connectToDB;
