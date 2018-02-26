const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Routes Dashboard' , function() {
   describe('GET /dashboard', function() {
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

       it('should not allow unauthenticated user', function(done) {
           done();
       });

       it('should allow authenticated user', function(done) {
           done();
       });
   });
});