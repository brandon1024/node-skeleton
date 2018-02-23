function validateForm() {
    /* Validate Username Length Constraint */
    var username = document.getElementById('username').value;
    if(username.length < 6 || username.length > 32) {
        document.getElementById('username').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('username').classList.remove('invalid');

    /* Validate Email Length Constraint */
    var email = document.getElementById('email').value;
    if(email.length > 255) {
        document.getElementById('email').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('email').classList.remove('invalid');

    /* Validate Password Length Constraint */
    var password = document.getElementById('password').value;
    if(password.length > 64) {
        document.getElementById('password').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('password').classList.remove('invalid');

    /* Validate Password Match */
    var passwordConfirm = document.getElementById('password-confirm').value;
    if(password !== passwordConfirm) {
        document.getElementById('password-confirm').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('password-confirm').classList.remove('invalid');

    return true;
}

document.getElementById('username').addEventListener('change', function(event) {
    var targetElement = event.target || event.srcElement;
    if(!targetElement.value)
        targetElement.classList.remove('invalid');
});

document.getElementById('email').addEventListener('change', function(event) {
    var targetElement = event.target || event.srcElement;
    if(!targetElement.value)
        targetElement.classList.remove('invalid');
});

document.getElementById('password').addEventListener('change', function(event) {
    var targetElement = event.target || event.srcElement;
    if(!targetElement.value)
        targetElement.classList.remove('invalid');
});

document.getElementById('password-confirm').addEventListener('change', function(event) {
    var targetElement = event.target || event.srcElement;
    if(!targetElement.value)
        targetElement.classList.remove('invalid');
});