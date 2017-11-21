let socket = io();

/* --- SERVER CONNECT --- */
socket.on('connect', function() {
    console.log('Connected to server.');

    /* --- MESSENGER APPLICATION --- */
    // socket.emit('createMessage', {
    //     to: 'Everyone',
    //     createdAt: new Date().toISOString(),
    //     text: 'Hey guys, I\'ll join you all there!'
    // });
});

/* --- ADMIN WELCOME USER --- */
socket.on('welcomeMessage', function (message) {
    "use strict";
    console.log('New message', message);
});

/* --- ADMIN NEW USER ENTERED --- */
socket.on('enterNewUser', function (message) {
    "use strict";
    console.log('New message', message);
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



