const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Message = mongoose.model('Message')
const Post = mongoose.model("Post")


router.post("/savetodb", async (req,res) => {
    const {senderid, message, roomid, recieverid} = req.body; 
    try{
     const newMessage = new Message({ 
        senderid, 
        message, 
        roomid, 
        recieverid 
     })
     await newMessage.save()
     res.send("Message saved successfully ")
    }catch(err){
        res.status(422).send(err.message)
    }
})
router.post('/getmessages',async (req,res) => {
  const {roomid} = req.body 
  Message.find({roomid:roomid})
  .then(messages => {
    res.send({messages})
  })
  .catch(err => {
    res.status(422).send(err.message)
  })
})
router.post("/setusermessages", async (req,res) => {
  const {ourid, otherid, lastMessage, roomid} = req.body 
  User.findOne({_id: ourid})
  .then(user => {
    user.allmessages.map((item) => {
      if(item,otherid == otherid){
        user.allmessages.pull(item.otherid)
      }
    })
    const date = Date.now() 
    user.allmessages.push({
      ourid, 
      otherid,
      lastMessage,
      roomid,
      date
    })
    user.save()
    res.status(200).send({message: "Message saved successfully"})
  })
  .catch(err => {
    res.status(422).send(err.message)
  })
})

router.post('/getusermessages', async (req,res) => { 
  const {userid} = req.body 
  // console.log("USERID RECEIVED")
  User.findOne({_id: userid})
  .then(user => {
    res.send(user.allmessages); 
  })
  .catch(err => {
    res.status(422).send(err.message)
  })
})
module.exports = router; 