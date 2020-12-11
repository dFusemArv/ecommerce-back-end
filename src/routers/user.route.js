const { response } = require('express');
const express=require('express');
const { signup, signin, afterSignIn } = require('../controllers/user.controller');
const router=express.Router();




router.post('/signin',signin);


router.post('/signup',signup);



// router.post('/profile',afterSignIn,(request,response)=>{
//     response.status(200).json({
//         message:"profile"
//     })
// })

module.exports=router;