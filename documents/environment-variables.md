# Server Environment Variables
- NODE_ENV:
    Specify the server run environment. This can be one of `development`, `test`, or `production`. Defaults to `development` if unspecified or invalid.
- HTTP_PORT:
    Specify server port for HTTP connections. For development, should be set to `3000`. Defaults to `80`.
- HTTPS_PORT:
    Specify server port for HTTPS connections. For development, should be set to `9443`. Defaults to `443`.
- HTTPS_KEY_PATH:
    Specify location of client key. Path must be relative to project working directory. Defaults to `config/cert/client-key.pem`.
- HTTPS_CERT_PATH:
    Specify location of client certificate. Path must be relative to project working directory. Defaults to `config/cert/client-cert.pem`.
- DB_HOST:
- DB_USER:
- DB_PASS:
- DEBUG:
    Specify console logging for debugging purposes for use in development. Should NOT be enabled in production environment. See [debug](https://www.npmjs.com/package/debug) for more configuration details.