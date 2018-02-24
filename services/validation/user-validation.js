module.exports = {
    validateUsername: function(username) {
        if(!username)
            return 'Empty or missing username.';
        if(username.match(/[^a-zA-Z0-9\-\_\.]/g))
            return 'Username may only contain letters (a-z, A-Z), numbers (0-9), dashes (-), underscores (_), and periods (.).';
        if(username.length < 6 || username.length > 32)
            return 'Username must be between 6 and 32 characters long.';

        return false;
    },
    validateEmail: function(email) {
        if(!email)
            return 'Empty or missing email.';
        if(!email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g))
            return 'Invalid email address.';
        if(email.length > 255)
            return 'Email must be no more than 255 characters long.';

        return false;
    },
    validatePassword: function(password) {
        if(!password)
            return 'Empty or missing password.';
        if(password.match(/[^a-zA-Z0-9~`!@#$%^&*()+=_\-{}\[\]\\|:;”’?/<>,.]/g))
            return 'Password may only contain letters (a-z, A-Z), numbers (0-9), and symbols (~`!@#$%^&*()+=_-{}[]|:;”’?/<>,.).';
        if(password.length < 6 || password.length > 64)
            return 'Password must be between 6 and 64 characters long.';

        return false;
    }
};