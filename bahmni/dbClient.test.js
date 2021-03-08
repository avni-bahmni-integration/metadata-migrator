import {SSHConnection} from './dbClient';

it('should connect to mysql', function () {
    SSHConnection.then(() => {
            console.log("Connected Successfully");
        },
        () => {
            console.log("Connection Failed");
        });
});