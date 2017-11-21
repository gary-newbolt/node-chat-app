var expect = require('expect');

var {generateMessage} = require('./message');

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
