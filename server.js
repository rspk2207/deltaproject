const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/',(req,res)=>{
let id = uuidV4();
res.render('main',{roomId: id});
});
app.get('/:room',(req,res)=>{
res.render('room',{roomId: req.params.room});
});
io.on('connection', (socket)=>{
    socket.on('join-room',(roomId, userId)=>{
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected',userId)
    
    socket.on('disconnect',()=>{
        socket.broadcast.to(roomId).emit('user-disconnected',userId)
    })
    })
    })
server.listen(3000,()=>{
    console.log("PORT set in 3000");
});