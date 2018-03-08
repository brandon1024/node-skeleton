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
    /* Remove Warning Text */
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

    document.getElementById('password-confirm').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    /* Username Indicator */
    document.getElementById('username').addEventListener('input', function(event) {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var username = inputField.value;

        var classes = inputField.classList.toString().match(/good|bad/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                inputField.classList.remove(classes[index]);

        if(username.length === 0)
            return;

        if(username.length < 6 || username.length > 32)
            inputField.classList.add('bad');
        else
            inputField.classList.add('good');
    });

    /* Email Indicator */
    document.getElementById('email').addEventListener('input', function(event) {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var email = inputField.value;

        var classes = inputField.classList.toString().match(/good|bad/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                inputField.classList.remove(classes[index]);

        if(email.length === 0)
            return;

        if(email.length > 255 || email.match(/^[^@]+@[^@]+$/) == null)
            inputField.classList.add('bad');
        else
            inputField.classList.add('good');
    });

    /* Password Strength Indicator */
    document.getElementById('password').addEventListener('input', function(event) {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var password = inputField.value;
        var strength = passwordStrength(password);

        var classes = inputField.classList.toString().match(/strength\d/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                inputField.classList.remove(classes[index]);

        if(password.length === 0)
            return;

        if(strength === 0)
            inputField.classList.add('strength0');
        else if(strength === 1)
            inputField.classList.add('strength1');
        else if(strength === 2)
            inputField.classList.add('strength2');
        else if(strength === 3)
            inputField.classList.add('strength3');
        else
            inputField.classList.add('strength4');
    });

    /* Password Confirm Indicator */
    document.getElementById('password-confirm').addEventListener('input', function() {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var password = document.getElementById('password').value;
        var passwordConfirm = document.getElementById('password-confirm').value;

        var classes = inputField.classList.toString().match(/good|bad/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                inputField.classList.remove(classes[index]);

        if(passwordConfirm.length === 0)
            return;

        if(password !== passwordConfirm)
            inputField.classList.add('bad');
        else
            inputField.classList.add('good');
    });
};