

const mongoose = require("mongoose");




const restaurentSchema=mongoose.Schema({
    
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{
        street:String,
        city:String,
        state:String,
        country:String,
        zip:String
    },
    menu:[
        {
            
            name:String,
            description:String,
            price:Number,
            image:String,
        }

    ]

})




const RestaurentModel=mongoose.model("restaurent",restaurentSchema)


module.exports={RestaurentModel};


