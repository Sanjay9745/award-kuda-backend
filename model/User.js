const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,

    },
    address:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    adhar_card:{
        type:String,
    },
    blood_group:{
        type:String,
    },
    
    
})
const User = mongoose.model("User", userSchema);
module.exports = User;
