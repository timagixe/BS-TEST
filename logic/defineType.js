const _ = require('lodash');

function generatePropsForObject(obj) {
    if (_.isEmpty(obj)) {
        return { type: 'object' };
    }

    const schema = { type: 'object', properties: {} };
    for (let [key, val] of Object.entries(obj)) {
        schema.properties[key] = defineType(val);
    }
    return schema;
}

function defineType(value) {
    if (_.isObject(value) && !_.isArray(value)) {
        return generatePropsForObject(value);
    }

    if (_.isArray(value)) {
        return { type: 'array' };
    }

    if (_.isNull(value)) {
        return { type: 'null' };
    }

    if (_.isNumber(value)) {
        return { type: 'number' };
    }

    if (_.isBoolean(value)) {
        return { type: 'boolean' };
    }

    if (_.isString(value)) {
        return { type: 'string' };
    }
}

module.exports.defineType = defineType;
