const cassandra = require('cassandra-driver');
const {
    host,
    port,
    username,
    password,
    localDataCenter,
    keyspace,
} = require('../config');
const tableHasData = require('./tableHasData');

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

test('it should return bool', async () => {
    await client.connect();
    const res = await tableHasData(client, 'columns', 'system_schema');
    await expect(typeof res).toBe('boolean');
    await client.shutdown();
});
