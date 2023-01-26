const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('bcrypt')

router.post('/addpost',(req,res) => {
    const {email,image,posttext} = req.body 
    User.findOne({email: email})
    .then((savedUser) => {
        if(!savedUser){
            return req.status(422).json({error: 'Invalid credentials'})
        }
        savedUser.posts.push({image,posttext, likes: [], comments: []})
        savedUser.save()
        .then(user => {
            res.json({message: 'Post added successfully'})
        })
        .catch(err => {
            res.json({error: 'error adding post'})
        })
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router