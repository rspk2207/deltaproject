const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/',(req,res)=>{
res.render('main');
});
app.get('/room',(req,res)=>{
res.render('room');
});

server.listen(3000,()=>{
    console.log("PORT set in 3000");
});