const cassandra = require('cassandra-driver');
const { getSchemaFromJSON } = require('./getSchemaFromJSON');
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
    const res = await getSchemaFromJSON(client, 'tables', 'system_schema');
    expect(res).toMatchObject({
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'tables',
        type: 'object',
        properties: {
            keyspace_name: 'string',
            table_name: 'string',
            bloom_filter_fp_chance: 'number',
            caching: {
                keys: { type: 'string' },
                rows_per_partition: { type: 'string' },
            },
            cdc: ['string', 'null'],
            comment: 'string',
            compaction: {
                class: { type: 'string' },
                max_threshold: { type: 'string' },
                min_threshold: { type: 'string' },
            },
            compression: {
                chunk_length_in_kb: { type: 'string' },
                class: { type: 'string' },
            },
            crc_check_chance: 'number',
            dclocal_read_repair_chance: 'number',
            default_time_to_live: 'number',
            extensions: 'object',
            flags: 'array',
            gc_grace_seconds: 'number',
            id: 'string',
            max_index_interval: 'number',
            memtable_flush_period_in_ms: 'number',
            min_index_interval: 'number',
            read_repair_chance: 'number',
            speculative_retry: 'string',
        },
    });

    await client.shutdown();
});
