const { getTableSchema } = require('./getTableSchema');
const cassandra = require('cassandra-driver');

const {
    host,
    port,
    username,
    password,
    localDataCenter,
    keyspace,
} = require('../config');

const authProvider = new cassandra.auth.PlainTextAuthProvider(
    username,
    password
);

const client = new cassandra.Client({
    contactPoints: [`${host}:${port}`],
    authProvider,
    localDataCenter,
    keyspace,
});

test('it should return schema for tables of system_schema keyspace', async () => {
    await client.connect();
    const res = await getTableSchema(client, 'system_schema', 'tables');
    expect(res).toMatchObject({
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'tables',
        type: 'object',
        properties: {
            keyspace_name: { type: 'string' },
            table_name: { type: 'string' },
            bloom_filter_fp_chance: { type: 'number' },
            caching: {
                type: 'object',
                properties: {
                    keys: { type: 'string' },
                    rows_per_partition: { type: 'string' },
                },
            },
            cdc: { type: 'null' },
            comment: { type: 'string' },
            compaction: {
                type: 'object',
                properties: {
                    class: { type: 'string' },
                    max_threshold: { type: 'string' },
                    min_threshold: { type: 'string' },
                },
            },
            compression: {
                type: 'object',
                properties: {
                    chunk_length_in_kb: { type: 'string' },
                    class: { type: 'string' },
                },
            },
            crc_check_chance: { type: 'number' },
            dclocal_read_repair_chance: { type: 'number' },
            default_time_to_live: { type: 'number' },
            extensions: { type: 'object' },
            flags: { type: 'array' },
            gc_grace_seconds: { type: 'number' },
            id: { type: 'string' },
            max_index_interval: { type: 'number' },
            memtable_flush_period_in_ms: { type: 'number' },
            min_index_interval: { type: 'number' },
            read_repair_chance: { type: 'number' },
            speculative_retry: { type: 'string' },
        },
    });
    await client.shutdown();
});
