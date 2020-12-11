const { findOne } = require('../models/user.model');
const userModel=require('../models/user.model');

const jwt=require('jsonwebtoken');

const signup=(request,response)=>{
    userModel.findOne({email:request.body.email}).exec((error,user)=>{
        if(user){
            return response.status(400).json({
                message: "admin already exists"
            })
        }
    })



    const{
        firstName,
        lastName,
        userName,
        password,
        email,
        contact,

    }=request.body;

    const new_user=new userModel({
        firstName,
        lastName,
        userName,
        password,
        email,
        contact,
        role:'admin'
    })
    new_user.save((error,userData)=>{
        if(error){
            return response.status(400).json({
                message:"Could not store admin data, something went wrong.",
                error:error
            });
        }

        if(userData){
            return response.status(201).json({
                message:"new admin registered"
            });
        }
    })

}


const signin=(request,response)=>{
    userModel.findOne({email:request.body.email}).
    exec((error,userData)=>{
        if(error){
            return response.status(400).json({
                error
            })
        }


        if(userData){
                if(userData.authentication(request.body.password) && userData.role==="admin"){
                    const token=jwt.sign({ _id:userData._id }, process.env.JWT_PRIVATE_KEY,{ expiresIn: "1h" });
                    const {_id,userName,role,email,fullName}=userData;

                    response.status(200).json({
                        token,
                        user:{
                            _id,
                            fullName,
                            userName,
                            email,
                            role
                        }
                    });
                }
                else{
                    response.status(400).json({
                        message:"Invalid credentials, please try again"
                    })
                }

        }else{
           return response.status(400).json({
               message:"Oops! Something went wrong."
           });
        }
    })
}



const afterSignIn=(request,response,next)=>{
    // const decoded = jwt.verify(token, 'shhhhh');
    const token=request.headers.authorization.split(" ")[1];
    // console.log(token);

    const decodedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    request.decodedUser=decodedUser;
    next();
}


module.exports={signup,signin,afterSignIn};