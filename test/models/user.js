const assert = require('assert');
const User = require('../../models/user.js');

describe('User', function() {
    describe('creation', function() {
        it('should create user correctly', function(done) {
            let user = new User();

            assert.equal(user.username, 'username');
            assert.equal(user.password, 'password');
            done();
        });
    });

    describe('authentication', function() {
        it('should authorize correctly given correct password', function(done) {
            let user = new User();

            assert(user.authenticate('password'), 'authenticate should return true given a correct password');
            done();
        });

        it('should not authorize user given incorrect password', function(done) {
            let user = new User();

            assert(user.authenticate('rubbish'), 'authenticate should not return true given an incorrect password');
            done();
        });
    });
});