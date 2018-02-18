/* Database Connection Config */
module.exports = {
    db: {
        client: 'mysql',
        connection: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'hackthehack',
            database : 'hackathon',
            charset  : 'utf8'
        },
        debug: false
    },
    title: 'TITLE',
    navbar: {
        title: 'Navbar App Title',
        links: [
            {title: 'Home', url: '/'},
            {title: 'Login', url: '/login'},
            {title: 'Sign Up', url: '/signup'},
            {title: 'About', url: '/'},
            {title: 'Help', url: '/'},
            {title: 'Logout', url: '/logout'}]
    },
};
