require('dotenv').config()
const express=require('express')
const app=express()
const authRoutes=require('./routes/auth-routes')
const homeRoutes=require('./routes/home-routes')
const adminRoutes=require('./routes/admin-routes')

const uploadImageRoutes=require('./routes/image-routes');



app.use(express.json())
app.use('/api/auth/',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/image',uploadImageRoutes)

const PORT=process.env.PORT||3000
const connectToDB=require('./database/db')

connectToDB()


app.listen(PORT,()=>{
    
    console.log('server is listening to port',PORT);

})

