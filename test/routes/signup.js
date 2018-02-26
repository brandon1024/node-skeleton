const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Routes Signup' , function() {
    before(function(done) {
        knex('users').insert({username: 'username1', email: 'email@email.com', hash: '$2a$10$v1pzCi3QHgLj./gh4pnZDuJK3QSaDcFdjHP2tToJvbXxbVTxd/O0m'}).then(function() {
            return done();
        }).catch(function(err) {
            return done(err);
        });
    });

    after(function(done) {
        knex('users').del().then(function() {
            return done();
        }).catch(function(err) {
            return done(err);
        });
    });

    describe('GET /api/endpoint', function() {
        /* Add API Tests */
        it('should ...', function(done) {
            done();
        });
    });

    describe('POST /api/endpoint', function() {
        /* Add API Tests */
        it('should ...', function(done) {
            done();
        });
    });
});