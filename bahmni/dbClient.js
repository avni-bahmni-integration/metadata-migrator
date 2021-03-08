import {dbServer, forwardConfig, tunnelConfig} from "./dbConfig";

const mysql = require('mysql2');
const { Client } = require('ssh2');
// create an instance of SSH Client
const sshClient = new Client();

export const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
                if (err) reject(err);

                // create a new DB server object including stream
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };
                // connect to mysql
                const connection =  mysql.createConnection(updatedDbServer);
                // check for successful connection
                //  resolve or reject the Promise accordingly
                connection.connect((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(connection);
                });
            });
    }).connect(tunnelConfig);
});