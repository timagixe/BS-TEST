// module.exports = function tableSchemaHasObjectProps(schemaProps) {
//     for (let [_, param] of Object.entries(schemaProps)) {
//         if (param.type === 'object') return true;
//     }
//     return false;
// };

const tableSchemaHasObjectProps = require('./tableSchemaHasObjectProps');

test('it should return bool', () => {
    const res = tableSchemaHasObjectProps({
        aggregate_name: { type: 'string' },
        argument_types: { type: 'array' },
        final_func: { type: 'string' },
        initcond: { type: 'string' },
        keyspace_name: { type: 'string' },
        return_type: { type: 'object' },
        state_func: { type: 'string' },
        state_type: { type: 'string' },
    });
    expect(typeof res).toBe('boolean');
});
