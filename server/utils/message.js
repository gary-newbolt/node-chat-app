let generateMessage = (from, text) => {
    "use strict";
    return {
        from,
        text,
        createdAt: new Date().toISOString()
    };
};

module.exports = {generateMessage};
