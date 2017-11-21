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
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');


//command to configure the middleware
app.use(express.static(publicPath));

/* --- SERVER COMMAND TO START LISTENING --- */
io.on('connection', (socket) => {
    "use strict";

    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','A new user has joined the chat'));

    /* --- Messenger Application: RECEIVING BY CLIENT --- */
    // socket.emit('newMessage', {
    //    from: 'devilDog',
    //    createdAt: new Date().toISOString(),
    //    text: 'Yo, ¡chicas y chicos! lets meet up at 7pm'
    // });


    /* --- Messenger Application: SENDING BY CLIENT --- */
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback('This is from the server.'
        );
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    /* --- CLIENT DISCONNECT --- */
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
