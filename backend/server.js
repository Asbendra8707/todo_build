const env = require ("dotenv")
env.config()//Load envirnment variable

const express =require('express')
const app= express() //Initialize express
const path=require('path')
const userRouter = require('./routes/route')
app.use(express.json()) // to enable app to send JSON data/to be used after app creation
app.use(express.static(path.join(__dirname,'dist')))
const { connectDB } = require('./database/dbConnection')
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
})
app.use('/api', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,async ()=>{
    try{
        await connectDB()
        console.log(`Server running on port ${PORT}`);        
    } catch (error){
        console.error("Failed to connect to database:",error);        
    }
})