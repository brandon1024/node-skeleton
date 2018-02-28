const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Routes Dashboard' , function() {
   describe('GET /dashboard', function() {
       it('should not allow unauthenticated user', function(done) {
           done();
       });

       it('should allow authenticated user', function(done) {
           done();
       });
   });
});