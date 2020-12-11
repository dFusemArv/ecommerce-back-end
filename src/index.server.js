//express app
const express=require('express');
const app=express();
const mongoose = require('mongoose');
//bodyparser 
const bodyParser=require('body-parser');
//routers
const userRouters=require('./routers/user.route');


//configuring dotenv to excess env file
require('dotenv').config();




//mongodb

mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.rhtq2.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(()=>{console.log("database connected yay!")});
// mongodb+srv://root:<password>@cluster0.rhtq2.mongodb.net/<dbname>?retryWrites=true&w=majority

//to send data in postman
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));







//using userRouters middleware
app.use('/api',userRouters);

app.listen(process.env.PORT,()=>{
    console.log(`server is up and running in ${process.env.PORT}`);
})



