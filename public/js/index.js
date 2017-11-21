let socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');

    /* -----EMAIL EXAMPLE-----
        socket.emit('createEmail', {
            to: 'jen@example.com',
            text: 'Hey, this is Gary.'

        });
    */

    /* --- MESSENGER APPLICATION --- */
    socket.emit('createMessage', {
        to: 'Everyone',
        createdAt: new Date().toISOString(),
        text: 'Hey guys, I\'ll join you all there!'
    });
});


/* --- EMAIL EXAMPLE ---
socket.on('newEmail', function (email) {
    console.log('New email',email);
});
*/

/* --- MESSENGER RECEIVING --- */

socket.on('newMessage', function (newMessage) {
    "use strict";
    console.log('New message', newMessage);
});


/* --- SERVER DISCONNECT --- */
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});



