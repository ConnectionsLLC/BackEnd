const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    }, 
    lowerUsername: {
        type: String, 
        required: true, 
        unique: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: true,
    },
    profile: {
        type: String, 
        default: ''
    }, 
    followers: {
        type: Array, 
        default: []
    },
    following: {
        type: Array, 
        default: []
    }, 
    descritption: {
        type: String, 
        default: "Hey there, I Am Using Social!"
    }, 
    allmessages: { 
        type: Array, 
        default: []
    }

})

mongoose.model("User",userSchema)