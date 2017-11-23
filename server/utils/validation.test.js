const expect = require('expect');

const {isRealString} = require('./validation');

// import isRealString

// isRealString
    // should reject non-string values
    // should reject string with only spaces
    // should allow string with non-space characters

describe('isRealString', () => {
    "use strict";
    it('should reject non-string values', () => {
        const passedString = 34;
        let response = isRealString(passedString);

        expect(response).toBe(false);
    });

    it('should reject string with only space', () => {
        const passedString = '     ';
        let response = isRealString(passedString);

        expect(response).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const passedString = ' Gary   ';
        let response = isRealString(passedString);

        expect(response).toBe(true);
    });
});
