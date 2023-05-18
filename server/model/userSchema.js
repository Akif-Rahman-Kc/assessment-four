const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstName:{
        type:String,
        minlength:5,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    phoneNo:{
        required: true,
        type: String,
        trim: true
    }
    
},{ timestamps: true })

module.exports = model('users',userSchema);