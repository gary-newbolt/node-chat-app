require('./config/config');
const path = require('path');//
const http = require('http');//
const socketIO = require('socket.io');//
const express = require('express');//

const app = express();//
const port = process.env.PORT;//
var server = http.createServer(app);
var io = socketIO(server);//


const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var users = new Users();


//command to configure the middleware
app.use(express.static(publicPath));

/* --- SERVER COMMAND TO START LISTENING --- */
io.on('connection', (socket) => {
    "use strict";


    /* --- STRING CHECK FOR LOGIN PAGE --- */
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.')
        }
        // JOINS room
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // CONNECTION messages
        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined the chat`));
        callback();
    });





    /* --- Messenger Application: RECEIVING BY CLIENT --- RETIRED */
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


    /* --- LOCATION Messenger Application: SENDING BY CLIENT --- */
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });


    /* --- CLIENT DISCONNECT --- */
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat. `));
        }
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
