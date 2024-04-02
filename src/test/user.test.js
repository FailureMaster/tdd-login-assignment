const chai = require('chai');
const expect = chai.expect;
const UserModel             = require('../models/user.model');

describe('Login feature', function(){

    describe('User Model', function(){
        
        it('Given email and password as input, it should return user info (including password) when the email is found in the database', async () => {
            let usModel     = new UserModel();
            let user        = await usModel.getUsers('testuser@test.com', 'password123');
            expect(user.email).to.equal('testuser@test.com');
            expect(user.password).to.equal('password123');
        });

        it("Given email and password as input, it should return false when email doesn't exist in database.", async() => {
            let usModel = new UserModel();
            let user = await usModel.getByEmail('testuser@test.com');

            expect(user).to.equal(true);
        });

        it("Given email and password as input, it should return true when email and password is correct", async() => {
            let usModel     = new UserModel();
            let user        = await usModel.getUsers('testuser@test.com', 'password123');
            expect(user.email).to.equal('testuser@test.com');
            expect(user.password).to.equal('password123');
        });

        it('Given email and password as input, it should return the expected redirect_url (/success page) on success', async() => {
            let usModel     = new UserModel();
            let url        = await usModel.authenticateIt('testuser@test.com', 'password123');
            expect(url).to.equal('/success');
        });

        it('Given password as input, it should return an error message saying: Email is required, when email is missing', async () => {
            let usModel     = new UserModel();
            let user        = await usModel.getUsers('', 'password123');

            // console.log(user);
            expect(user).to.equal('email is required');
        });

        it('Given email as input, it should return an error message saying: Password is required, when password is missing', async () => {
            let usModel = new UserModel();
            let user = await usModel.getUsers('test', '');

            expect(user).to.equal('password is required');

        });

        it('Given empty input, it should return an error message saying: Email and password is required, when all fields are missing', async () => {
            let usModel = new UserModel();
            let user = await usModel.getUsers('', '');

            expect(user).to.equal('Email and password is required')
        });
        
    });
});

