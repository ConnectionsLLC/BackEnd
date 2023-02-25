const express = require('express'); 
const port = 3000; 
const port1 = 3001;
const app = express(); 
const bodyParser = require('body-parser');
require('./db')
require('./Models/User')
require('./Models/Message')
require('./Models/Post')


const authRoutes = require('./routes/authRoutes')
const uploadMediaRoutes = require('./routes/uploadMediaRoutes')
const messageRoutes = require('./routes/messageRoutes')

const {createServer} = require('http')
const {Server} = require('socket.io');
const { SocketAddress } = require('net');
const httpServer = createServer()
const io = new Server(httpServer, {})


app.use(bodyParser.json())
app.use(authRoutes)
app.use(messageRoutes)
app.use(uploadMediaRoutes)


app.get('/',(req,res) => { 
    res.send("Hello World");
})

io.on('connection',(socket) => {
    console.log("USER CONNECTED - ", socket.io)

    socket.on('disconnect', () => {
    console.log("USER DISCONNECTED - ", socket.io)
    })
    socket.on('join_room',(data) => {
        console.log("USER WITH ID - ",socket.id, 'JOIN ROOM - ', data.roomid)
        socket.join(data)
    })
    socket.on('send_message',(data) => {
        console.log('MESSAGE RECEIVED - ',data)
        io.emit('receiver message',data)

    })
})
httpServer.listen(port1, () => {
    console.log("Socketio Server Runnning    On Port "+port)

})

app.listen(port, () => {
    console.log("Server Runnning On Port "+port)
})