const dataTypes = require('../constants/types');
const getJSType = require('./getJSType');

test('it should return js type as string', () => {
    expect(getJSType('ascii')).toBeTruthy();
    expect(getJSType('blob')).toBe('string');
});
