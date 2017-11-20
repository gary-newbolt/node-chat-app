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

// register event listener
io.on('connection', (socket) => {
    "use strict";
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
