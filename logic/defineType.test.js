const _ = require('lodash');
const { defineType } = require('./defineType');

test('it should return string if string type', () => {
    expect(defineType('string type')).toBe('string');
});

test('it should return boolean if bool type', () => {
    expect(defineType(true)).toBe('boolean');
});

test('it should return array if array type', () => {
    expect(defineType(['first', 'second'])).toBe('array');
});

test('it should return number if number type', () => {
    expect(defineType(5)).toBe('number');
});

test('it should return object if empty object type', () => {
    expect(defineType({})).toBe('object');
});

test('it should return object with props if object type', () => {
    expect(defineType({ propName: 'propValue' })).toMatchObject({
        propName: { type: 'string' },
    });
});
