require('./config/config');
const path = require('path');//
const http = require('http');//
const socketIO = require('socket.io');//
const express = require('express');//

var app = express();//
const port = process.env.PORT;//
var server = http.createServer(app);
var io = socketIO(server);//


const publicPath = path.join(__dirname, '../public');


//command to configure the middleware
app.use(express.static(publicPath));

/* --- SERVER COMMAND TO START LISTENING --- */
io.on('connection', (socket) => {
    "use strict";

    console.log('New user connected');
    socket.emit('welcomeMessage', {
        createdAt: new Date().toISOString(),
        from: 'Admin',
        text: 'Welcome to the chat app.'
    });
    
    socket.broadcast.emit('enterNewUser', {
        createdAt: new Date().toISOString(),
        from: 'Admin',
        text: 'A new user has joined the chat.'
    });

    /* --- Messenger Application: RECEIVING BY CLIENT --- */
    // socket.emit('newMessage', {
    //    from: 'devilDog',
    //    createdAt: new Date().toISOString(),
    //    text: 'Yo, ¡chicas y chicos! lets meet up at 7pm'
    // });


    /* --- Messenger Application: SENDING BY CLIENT --- */
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
           from: message.from,
           createdAt: new Date().toISOString(),
           text: message.text
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toISOString()
        });
    });

    /* --- CLIENT DISCONNECT --- */
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
