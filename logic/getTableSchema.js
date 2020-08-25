const {
    getDataTypeNameByCode: getCassandraType,
} = require('cassandra-driver').types;
const getJSType = require('./getJSType');
const tableSchemaHasObjectProps = require('./tableSchemaHasObjectProps');
const tableHasData = require('./tableHasData');
const { getSchemaFromJSON } = require('./getSchemaFromJSON');

async function getTableSchema(client, keyspaceName, tableName) {
    try {
        const schema = await client.metadata
            .getTable(keyspaceName, tableName)
            .then(function (table) {
                const tableSchema = {
                    $schema: 'http://json-schema.org/draft-04/schema#',
                    title: '',
                    type: 'object',
                    properties: {},
                };

                tableSchema.title = table.name;

                table.columns.forEach(function (column) {
                    tableSchema.properties[column.name] = {
                        type: getJSType(
                            getCassandraType({ code: column.type.code })
                        ),
                    };
                });

                return tableSchema;
            });

        if (
            tableSchemaHasObjectProps(schema.properties) &&
            (await tableHasData(client, schema.title, keyspaceName))
        ) {
            const schemaFromJSON = await getSchemaFromJSON(
                client,
                schema.title,
                keyspaceName
            );
            return schemaFromJSON;
        }

        return schema;
    } catch (error) {
        throw new Error(
            'Error on execution getTableSchema appeared ' + error.message
        );
    }
}

module.exports.getTableSchema = getTableSchema;
