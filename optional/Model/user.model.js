const mongoose = require("mongoose");




const userSchema=mongoose.Schema({
    
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{
        street:String,
        city:String,
        state:String,
        country:String,
        zip:String
    }

})




const UserModel=mongoose.model("user",userSchema)


module.exports={UserModel};


