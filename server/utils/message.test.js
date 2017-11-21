var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    "use strict";
    it('Should generate correct message object', () => {
        const from = 'Gary';
        const text = 'Hey buddies, what up with ya\'ll??';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('string');
        expect(message).toInclude({
            text,
            from
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate a correct location object', () => {
        "use strict";
        const longitude = 1;
        const latitude = 1;
        const from = 'Gary';

        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message).toBe('object');
        expect(message).toInclude({from,url});
    });
});