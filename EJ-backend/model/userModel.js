const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role:{
        type:Number,
        default:0,
    },
    cart:{
        type:[],
        default:[]
    }
    
},{timestamps:true})

exports.User =  mongoose.model("User",userSchema);