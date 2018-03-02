const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Routes Dashboard' , () => {
   describe('GET /dashboard', () => {
       it('should not allow unauthenticated user', (done) => {
           done();
       });

       it('should redirect unauthenticated user to login page', (done) => {
           done();
       });

       it('should allow authenticated user', (done) => {
           done();
       });
   });
});