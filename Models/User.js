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
    profile: {
        type: String, 
        default: ''
    }, 
    posts: {
        type: Array, 
        default: []
    }, 
    stories: {
        type: Array, 
        default: []
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

})
mongoose.model("User",userSchema)