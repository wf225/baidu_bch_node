const spawn = require('child_process').spawn;
const process = require('process');
const fs = require('fs');
const path = require('path');
const util = require('util');

// log to file
var log_file = fs.createWriteStream(path.join(__dirname, '../nodeout'), { flags: 'a' });
var log_stdout = process.stdout;
console.log = function (d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

// create daemon
var server = null;
function startServer() {
    server = spawn('node', ['./server/app.js']);
    console.log(util.format('[%s] start server: parent-pid = %s, sub-process pid = %s', new Date().toLocaleString(), process.pid, server.pid));

    // close
    server.on('close', function (code, signal) {
        console.log(util.format('[%s] sub-process is closed, try to restart.', new Date().toLocaleString()));
        server.kill(signal);
        server = startServer();
    });
    // error
    server.on('error', function (code, signal) {
        console.log(util.format('[%s] sub-process got error, try to restart.', new Date().toLocaleString()));
        server.kill(signal);
        server = startServer();
    });

    return server;
};

startServer();
