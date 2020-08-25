const _ = require('lodash');
const { defineType } = require('./defineType');

test('it should return string if string type', () => {
    expect(defineType('string type')).toMatchObject({ type: 'string' });
});

test('it should return boolean if bool type', () => {
    expect(defineType(true)).toMatchObject({ type: 'boolean' });
});

test('it should return array if array type', () => {
    expect(defineType(['first', 'second'])).toMatchObject({ type: 'array' });
});

test('it should return number if number type', () => {
    expect(defineType(5)).toMatchObject({ type: 'number' });
});

test('it should return object if empty object type', () => {
    expect(defineType({})).toMatchObject({ type: 'object' });
});

test('it should return object with props if object type', () => {
    expect(defineType({ propName: 'propValue' })).toMatchObject({
        type: 'object',
        properties: {
            propName: { type: 'string' },
        },
    });
});
