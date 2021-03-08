// dbConfig.js
// define connection config for the database
const homedir = require('os').homedir();

export const dbServer = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "openmrs"
};

export const tunnelConfig = {
    host: "143.110.188.91",
    port: 22,
    username: "root",
    privateKey: require('fs').readFileSync(`${homedir}/.ssh/bahmni-ashwini-do`)
};

export const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};