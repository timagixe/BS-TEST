const cassandra = require('cassandra-driver');
const {
    host,
    port,
    username,
    password,
    localDataCenter,
    keyspace,
} = require('./config');
const _ = require('lodash');
const fs = require('fs');
const getTables = require('./logic/getTables');
const { getTableSchema } = require('./logic/getTableSchema');

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

async function getArrayOfSchemas(client, tablesArray) {
    return Promise.all(
        tablesArray.map((table) => getTableSchema(client, keyspace, table))
    );
}

async function app() {
    try {
        await client.connect();
    } catch (error) {
        throw new Error('Invalid config data was provided');
    }

    const tables = await getTables(client, keyspace);
    const tablesSchemas = await getArrayOfSchemas(client, tables);
    fs.writeFileSync('result.json', JSON.stringify(tablesSchemas));

    await client.shutdown();
}

app().catch((error) => console.log(error));
