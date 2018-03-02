const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Routes Login' , () => {
    describe('GET /login', () => {
        it('should successfully render login page', (done) => {
            done();
        });

        it('should successfully redirect authenticated user to dashboard', (done) => {
            done();
        });
    });

    describe('POST /login', () => {
        it('should redirect to dashboard given valid credentials', (done) => {
            done();
        });

        it('should not redirect to dashboard given invalid credentials', (done) => {
            done();
        });
    });
});