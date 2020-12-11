const mongoose=require('mongoose');
const bcrypt =require('bcrypt');

const userSchema=new mongoose.Schema({
        firstName:{
            type: String,
            trim: true,
            required: true,
            min: 2
        },
        lastName:{
            type: String,
            trim: true,
            required: true,
            min: 2
        },
        userName:{
            type: String,
            trim: true,
            required: true,
            min: 2,
            unique:true,
            lowercase:true,
            index:true
        },
        email:{
            type:String,
            trim: true,
            required:true,
            unique:true
        },
        contact:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },
        hash_password:{
            type:String,
            min:8,
            // required:true
        },
        profilePicture:{
            type:String
        }
},{timestamps:true});





userSchema.virtual('password').set(function(password) {
        this.hash_password=bcrypt.hashSync(password,10);

  });


  userSchema.virtual('fullName').get(function(){
      return `${this.firstName} ${this.lastName}`;
  })


  userSchema.method({
      authentication:function(password){
            return bcrypt.compareSync(password, this.hash_password);
      }
  });
const userModel=mongoose.model('user',userSchema);

module.exports=userModel;