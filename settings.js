/* Database Connection Settings */
var settings = {
    database   : {
        protocol : "mysql",
        query    : { pool: true },
        host     : "127.0.0.1",
        database : "CECCompetition",
        user     : "root",
        password : "password"
    }
};

module.exports = settings;