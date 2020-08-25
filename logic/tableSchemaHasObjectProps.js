module.exports = function tableSchemaHasObjectProps(schemaProps) {
    for (let [_, param] of Object.entries(schemaProps)) {
        if (param.type === 'object') return true;
    }
    return false;
};
