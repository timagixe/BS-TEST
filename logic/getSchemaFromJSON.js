const { defineType } = require('./defineType');

async function getSchemaFromJSON(client, table, keyspace) {
    try {
        const query = `SELECT JSON * FROM ${table} WHERE keyspace_name = '${keyspace}' LIMIT 1`;
        const result = await client.execute(query, { prepare: true });
        const row = result.rows[0];
        const JSONValue = Object.values(row)[0];

        const tableSchema = {
            $schema: 'http://json-schema.org/draft-04/schema#',
            title: '',
            type: 'object',
            properties: {},
        };

        tableSchema.title = table;

        for (let [key, val] of Object.entries(JSON.parse(JSONValue))) {
            tableSchema.properties[key] = { type: defineType(val) };
        }

        return tableSchema;
    } catch (error) {
        throw new Error(
            'Error on execution getSchemaFromJSON appeared ' + error.message
        );
    }
}
module.exports.getSchemaFromJSON = getSchemaFromJSON;
