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

/* Returns a value from 0 to 4, with 0 being least strong */
function passwordStrength(pass) {
    var points = pass.match(/[a-z]/g) ? pass.match(/[a-z]/g).length : 0;
    points += (pass.match(/[A-Z]/g) ? pass.match(/[A-Z]/g).length : 0) * 1.5;
    points += (pass.match(/\d/g) ? pass.match(/\d/g).length : 0) * 2;
    points += (pass.match(/[\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g) ? pass.match(/[\x20-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g).length : 0) * 2.5;

    return Math.min(4, Math.floor(points / 4));
}

window.onload = function() {
    document.getElementById('username').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('email').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('password').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('password').addEventListener('input', function() {
        /* Change Incator Bar Color */
        var labelIndicator = document.querySelector('input[type=password]');
        var password = document.getElementById('password').value;
        var strength = passwordStrength(password);

        var classes = labelIndicator.classList.toString().match(/strength\d/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                labelIndicator.classList.remove(classes[index]);

        if(strength === 0)
            labelIndicator.classList.add('strength0');
        else if(strength === 1)
            labelIndicator.classList.add('strength1');
        else if(strength === 2)
            labelIndicator.classList.add('strength2');
        else if(strength === 3)
            labelIndicator.classList.add('strength3');
        else
            labelIndicator.classList.add('strength4');
    });

    document.getElementById('password-confirm').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });
};