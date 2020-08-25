const _ = require('lodash');

function generatePropsForObject(obj) {
    if (_.isEmpty(obj)) {
        return 'object';
    }

    const schema = {};
    for (let [key, val] of Object.entries(obj)) {
        schema[key] = {
            type: defineType(val),
        };
    }
    return schema;
}

function defineType(value) {
    if (_.isObject(value) && !_.isArray(value)) {
        return generatePropsForObject(value);
    }

    if (_.isArray(value)) {
        return 'array';
    }

    if (_.isNull(value)) {
        return ['string', 'null'];
    }

    if (_.isNumber(value)) {
        return 'number';
    }

    if (_.isBoolean(value)) {
        return 'boolean';
    }

    if (_.isString(value)) {
        return 'string';
    }
}

module.exports.defineType = defineType;
