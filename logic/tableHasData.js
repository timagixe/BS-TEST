module.exports = async function tableHasData(client, table, keyspace) {
    try {
        const query = `SELECT JSON * FROM ${table} WHERE keyspace_name = '${keyspace}' LIMIT 1`;
        const result = await client.execute(query, { prepare: true });
        return !!result.rows.length;
    } catch (error) {
        throw new Error(
            'Error on execution tableHasData appeared ' + error.message
        );
    }
};
