var isRealString = (str) => {
    "use strict";
    return typeof str === 'string' && str.trim().length > 0;
};


module.exports = {
    isRealString
};