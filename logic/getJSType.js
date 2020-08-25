const dataTypes = require('../constants/types');

module.exports = function getJSType(cassandraType) {
    return dataTypes[cassandraType];
};
