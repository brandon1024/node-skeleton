#!/usr/bin/env node

/* Module Dependencies */
const app = require('../app');
const debug = require('debug')('nodeapp:server');
const https = require('https');
const http = require('http');
const fileSystem = require('fs');

if(!process.env.NODE_ENV) {
    console.log(`No NODE_ENV environment variable specified. Defaulting to 'development' environment.`);
    process.env.NODE_ENV = 'development';
} else if(!['development', 'test', 'production'].includes(process.env.NODE_ENV)) {
    console.log(`Invalid NODE_ENV environment variable specified. Defaulting to 'development' environment.`);
    process.env.NODE_ENV = 'development';
}

/* Configure HTTPS Sever */
const HTTPSport = normalizePort(process.env.HTTPS_PORT || '443');
const serverConfig = {
    key: fileSystem.readFileSync(process.env.HTTPS_KEY_PATH || 'config/cert/client-key.pem'),
    cert: fileSystem.readFileSync(process.env.HTTPS_CERT_PATH || 'config/cert/client-cert.pem')
};
const httpsServer = https.createServer(serverConfig, app).listen(HTTPSport);
httpsServer.on('error', (error) => {
    if (error.syscall !== 'listen')
        throw error;

    let bind = typeof HTTPSport === 'string'
        ? 'Pipe ' + HTTPSport
        : 'Port ' + HTTPSport;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
httpsServer.on('listening', () => {
    let addr = httpsServer.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
});

console.log('HTTPS Listening on port ' + HTTPSport);

/* Configure HTTP Server According to ENFORCE_HTTPS*/
if(process.env.ENFORCE_HTTPS === 'true') {
    const HTTPport = normalizePort(process.env.HTTP_PORT || '80');
    http.createServer(function(req, res) {
        if(process.env.NODE_ENV === 'development')
            res.writeHead(302, { "Location": "https://localhost:" + HTTPSport + req.url });
        else
            res.writeHead(302, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(HTTPport);
} else {
    const HTTPport = normalizePort(process.env.HTTP_PORT || '80');
    const httpServer = http.createServer(app).listen(HTTPport);
    httpServer.on('error', (error) => {
        if (error.syscall !== 'listen')
            throw error;

        let bind = typeof HTTPport === 'string'
            ? 'Pipe ' + HTTPport
            : 'Port ' + HTTPport;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    httpServer.on('listening', () => {
        let addr = httpServer.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    });
    console.log('HTTP Listening on port ' + HTTPport);
}

module.exports = app;

/* Normalize a port into a number, string, or false */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}