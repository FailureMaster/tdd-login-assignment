const Mysql                 = require('mysql');
const executeQuery  		= require('../config/database.js');

class UserModel {
    async getUsers(userMail, userPass) {
        let result = false;
        if ((userMail == undefined || userMail.length == 0) && (userPass == undefined || userPass.length == 0)) {
            return 'Email and password is required';
        }
        if (userMail == undefined || userMail.length == 0) {
            return 'email is required';
        }

        if (userPass == undefined || userPass.length == 0) {
            return 'password is required';
        }

        

        try {
            let myquery = await executeQuery(`SELECT * FROM users WHERE email = '${userMail}' AND password = '${userPass}'`);
            if (myquery) {
                return myquery[0];
            }
            
        } catch (error) {
            console.log(error);
        }
       return result;
	}

    async getByEmail(userMail){
        let isEmail = false;
        try {
            let myquery = await executeQuery(`SELECT * FROM users WHERE email = '${userMail}'`);

            if (myquery.length > 0) {
                console.log(myquery);
                isEmail = true;
            }
        } catch (error) {
            console.log(error);
        }
        return isEmail
    }

    async authenticateIt(userMail, userPass){
        let redirect_url = '';
        try {
            let myquery = await executeQuery(`SELECT * FROM users WHERE email = '${userMail}' AND password = '${userPass}'`);
            if (myquery.length > 0) {
                redirect_url =  '/success';
            }
            
        } catch (error) {
            console.log(error);
        }

        return redirect_url;
    }
}

module.exports = UserModel;