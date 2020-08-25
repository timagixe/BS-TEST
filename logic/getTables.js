module.exports = async function getTables(client, keyspaceName) {
    try {
        const query = `select table_name from system_schema.tables where keyspace_name = '${keyspaceName}'`;
        const queryResult = await client.execute(query, [], { preapre: true });
        const arrayOfTables = queryResult.rows.map((row) => row.table_name);
        return arrayOfTables;
    } catch (error) {
        throw new Error(
            'Error on execution getTables appeared ' + error.message
        );
    }
};
