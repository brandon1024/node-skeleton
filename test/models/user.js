const assert = require('assert');
const User = require('../../models/user.js');
const knex = require('../../config/db/bookshelf').knex;

describe('User', () => {
    afterEach((done) => {
        knex('users').del().then(() => {
            return done();
        }).catch((err) => {
            return done(err);
        });
    });

    describe('creation', () => {
        it('should create user correctly', (done) => {
            User.forge({username: 'username', email: 'email', hash: 'hash', salt: 'salt', role: 'user'}).save().then((user) => {
                return knex('users').where({id: user.attributes.id}).select();
            }).then((rows) => {
                assert(rows.length === 1, 'user should exist in DB after creation');
                return done();
            }).catch((err) => {
                return done(err);
            });
        });
    });

    describe('querying', () => {
        describe('by username', () => {
            before((done) => {
                knex('users').insert({username: 'username1', email: 'email@email.com'}).then(() => {
                    return done();
                }).catch((err) => {
                    return done(err);
                });
            });

            it('should find the correct record', (done) => {
                User.findByUsername('username1').then((user) => {
                    assert(user !== null, 'no record returned');
                    assert(user.attributes.username === 'username1', 'should have the username username1 but was ' + user.attributes.username);
                    assert(user.attributes.email === 'email@email.com', 'should have the email email@email.com but was ' + user.attributes.email );
                    return done();
                }).catch((err) => {
                    return done(err);
                });
            });
        });

        describe('by email', () => {
            before((done) => {
                knex('users').insert({username: 'username2', email: 'email2@email.com'}).then(() => {
                    return done();
                }).catch((err) => {
                    return done(err);
                });
            });

            it('should find the correct record', (done) => {
                User.findByEmail('email2@email.com').then((user) => {
                    assert(user !== null, 'no record returned');
                    assert(user.attributes.email === 'email2@email.com', 'should have the email email2@email.com but was ' + user.attributes.email);
                    assert(user.attributes.username === 'username2', 'should have the username username2 but was ' + user.attributes.username);
                    return done();
                }).catch((err) => {
                    return done(err);
                });
            });
        });

        describe('by id', () => {
            it('should find the correct record', (done) => {
                knex('users').insert({username: 'username3', email: 'email3@email.com'}).then((id) => {
                    return User.byId(id);
                }).then((user) => {
                    assert(user !== null, 'no record returned');
                    assert(user.attributes.username === 'username3', 'should have the username username3 but was ' + user.attributes.username);
                    assert(user.attributes.email === 'email3@email.com', 'should have the email email3@email.com but was ' + user.attributes.email );
                    return done();
                }).catch((err) => {
                    return done(err);
                });
            });
        });
    });
});