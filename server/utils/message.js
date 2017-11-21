let generateMessage = (from, text) => {
    "use strict";
    return {
        from,
        text,
        createdAt: new Date().toISOString()
    };
};

let generateLocationMessage = (from, latitude, longitude) => {
    "use strict";
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().toISOString()
    };
};


module.exports = {
    generateMessage,
    generateLocationMessage
};
