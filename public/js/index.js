let socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');

    /* --- MESSENGER APPLICATION --- */
    // socket.emit('createMessage', {
    //     to: 'Everyone',
    //     createdAt: new Date().toISOString(),
    //     text: 'Hey guys, I\'ll join you all there!'
    // });
});

/* --- MESSENGER RECEIVING --- */

socket.on('newMessage', function (message) {
    "use strict";
    console.log('New message', message);
});


/* --- SERVER DISCONNECT --- */
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});



