const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

/* App Setup */
const app = require('../../bin/www');
const User = require('../../models/user.js');
const knex = require('../../config/db/bookshelf').knex;

let userId;
let adminId;

describe('Routes Users' , () => {
    before((done) => {
        knex('users').insert({username: 'useruser', email: 'user@app.ca', hash: '$2a$10$v1pzCi3QHgLj./gh4pnZDuJK3QSaDcFdjHP2tToJvbXxbVTxd/O0m', role: 'user'}, 'id').then((id) => {
            userId = id;
            return knex('users').insert({username: 'adminadmin', email: 'admin@app.ca', hash: '$2a$10$v1pzCi3QHgLj./gh4pnZDuJK3QSaDcFdjHP2tToJvbXxbVTxd/O0m', role: 'admin'}, 'id');
        }).then((id) => {
            adminId = id;
            done();
        }).catch((err) => {
            return done(err);
        });
    });

    after((done) => {
        knex('users').del().then(() => {
            return done();
        }).catch((err) => {
            return done(err);
        });
    });

    describe('GET /users/find', () => {
        describe('unauthenticated user', () => {
            it('should not be granted permission to retrieve user records', (done) => {
                chai.request(app)
                    .get('/users/find')
                    .end((err, res) => {
                        assert(res.statusCode === 200, 'should have redirected to /login');
                        assert(res.res.req.path === '/login', 'should have redirected to /login');
                        done();
                    });
            });
        });

        describe('authenticated user with role user or admin', () => {
            /*
            before((done) => {
                chai.request(app)
                    .post('/login')
                    .set('Token', 'text/plain')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .type('form')
                    .send('username=useruser')
                    .send('password=password')
                    .end((err, res) => {
                        assert(res.statusCode === 200, 'should have succeeded');
                        assert(res.res.req.path === '/dashboard', 'should have redirected to /dashboard');
                        done();
                    });
            });

            after((done) => {
                chai.request(app)
                    .get('/logout')
                    .end((err, res) => {
                        assert(res.statusCode === 200, 'should have succeeded');
                        assert(res.res.req.path === '/login', 'should have redirected to /login');
                        done();
                    });
            });
            */

            it('should be granted permission to retrieve user records', (done) => {
                done();
            });

            it('should retrieve all records given no parameters', (done) => {
                done();
            });

            it('should retrieve subset of records by specifying id', (done) => {
                done();
            });

            it('should retrieve subset of records by specifying username', (done) => {
                done();
            });

            it('should retrieve subset of records by specifying email', (done) => {
                done();
            });

            it('should retrieve only id, username, email, role and email validated properties', (done) => {
                done();
            });
        });
    });

    describe('POST /users/create', () => {
        describe('unauthenticated user', () => {
            it('should not be granted permission to create user account', (done) => {
                chai.request(app)
                    .post('/users/create')
                    .send({username: 'username1', email: 'email@email.com', password: 'password1', role: 'user'})
                    .end((err, res) => {
                        assert(res.statusCode === 403, 'should have received status code 403 insufficient permissions');
                        done();
                    });
            });
        });

        describe('authenticated user with role user', () => {
            it('should not be granted permissin to create user account', (done) => {
                done();
            });
        });

        describe('authenticated user with role admin', () => {
            it('should be granted permission to create user account', (done) => {
                done();
            });
        });
    });

    describe('POST /users/update', () => {
        describe('unauthenticated user', () => {
            it('should not be granted permission to update user account', (done) => {
                done();
            });
        });

        describe('authenticated user with role user', () => {
            it('should not be granted permission to update user account', (done) => {
                done();
            });
        });

        describe('authenticated user with role admin', () => {
            it('should not be granted permission to update user account', (done) => {
                done();
            });
        });
    });

    describe('POST /users/delete', () => {
        describe('unauthenticated user', () => {
            it('should not be granted permission to delete user account', (done) => {
                done();
            });
        });

        describe('authenticated user with role user', () => {
            it('should not be granted permission to delete user account', (done) => {
                done();
            });
        });

        describe('authenticated user with role admin', () => {
            it('should not be granted permission to delete user account', (done) => {
                done();
            });
        });
    });
});