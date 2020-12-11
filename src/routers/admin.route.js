const { response } = require('express');
const express=require('express');
const { signup, signin, afterSignIn } = require('../controllers/admin.controller');
const router=express.Router();




router.post('/admin/signin',signin);


router.post('/admin/signup',signup);





module.exports=router;