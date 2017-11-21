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

/* --- SERVER DISCONNECT --- */
socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});



/* --- ADMIN WELCOME USER --- RETIRED for general message receiving code */
// socket.on('welcomeMessage', function (message) {
//     "use strict";
//     console.log('New message', message);
// });

/* --- ADMIN NEW USER ENTERED --- RETIRED for general message receiving code */
// socket.on('enterNewUser', function (message) {
//     "use strict";
//     console.log('New message', message);
// });

/* --- MESSENGER RECEIVING --- */
socket.on('newMessage', function (message) {
    "use strict";
    console.log('New message', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


/* --- MESSAGE ACKNOWLEDGEMENT --- RETIRED for general message receiving code */
// socket.emit('createMessage', {
//     from : 'Frank',
//     text: 'Hi'
// }, function(data) {
//     "use strict";
//     console.log('Got it.', data);
// });


/* --- PREVENTS PAGE REFRESH ON MESSAGE SUBMIT --- */
jQuery('#message-form').on('submit', function(e) {
    "use strict";
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});