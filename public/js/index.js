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

    var formattedTime = moment(message.createdAt).format(`H:mm`);
    console.log('New message', message);
    let li = jQuery('<li></li>');
    li.text(`${formattedTime} ${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


/* --- LOCATION MESSAGE RECEIVING --- */
socket.on('newLocationMessage', function (message) {
    "use strict";
    console.log('New message', message);
    var formattedTime = moment(message.createdAt).format(`H:mm`);
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${formattedTime} ${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

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


var messageTextBox = jQuery('[name=message]');

/* --- PREVENTS PAGE REFRESH ON MESSAGE SUBMIT --- */
jQuery('#message-form').on('submit', function(e) {
    "use strict";
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});


/* --- GEOLOCATION BUTTON --- */
let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    "use strict";
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});