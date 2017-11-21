require('./config/config');
const path = require('path');//
const http = require('http');//
const socketIO = require('socket.io');//

const express = require('express');//
const app = express();//
const port = process.env.PORT;//
const server = http.createServer(app);
const io = socketIO(server);//


const publicPath = path.join(__dirname, '../public');


//command to configure the middleware
app.use(express.static(publicPath));

// register event listener to watch for users.
io.on('connection', (socket) => {
    "use strict";
    console.log('New user connected');

    /* --- EMAIL EXAMPLE: CLIENT RECEIVE ---
    socket.emit('newEmail', {
        from : 'mike@example.com',
        text: 'Hey buddy, how are you doing?',
        createdAt: 123
    }); */

    /* --- Messenger Application: RECEIVING BY CLIENT --- */
    socket.emit('newMessage', {
       from: 'devilDog',
       createdAt: new Date().toISOString(),
       text: 'Yo, ¡chicas y chicos! lets meet up at 7pm'
    });

    /* --- EMAIL EXAMPLE: SERVER RECEIVE ---
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    }); */

    /* --- Messenger Application: SENDING BY CLIENT --- */
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    /* --- CLIENT DISCONNECT --- */
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
