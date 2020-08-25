const cassandra = require('cassandra-driver');
const {
    host,
    port,
    username,
    password,
    localDataCenter,
    keyspace,
} = require('../config');
const getTables = require('./getTables');

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

test('it should return an array', async () => {
    await client.connect();
    await expect(Array.isArray(await getTables(client, keyspace))).toBe(true);
    await client.shutdown();
});
