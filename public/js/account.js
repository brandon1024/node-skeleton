function validatePasswordForm() {
    /* Validate Password Length Constraint */
    var password = document.getElementById('new-password').value;
    if(password.length < 6 || password.length > 64) {
        document.getElementById('new-password').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('new-password').classList.remove('invalid');

    /* Validate Password Match */
    var passwordConfirm = document.getElementById('new-password-confirm').value;
    if(password !== passwordConfirm) {
        document.getElementById('new-password-confirm').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('new-password-confirm').classList.remove('invalid');

    return true;
}

function validateAccountInfoForm() {
    /* Validate Email Length Constraint */
    var email = document.getElementById('primary-email-address').value;
    if(email.length > 255) {
        document.getElementById('primary-email-address').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('primary-email-address').classList.remove('invalid');

    var emailSecondary = document.getElementById('secondary-email-address').value;
    if(emailSecondary.length > 255) {
        document.getElementById('secondary-email-address').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('secondary-email-address').classList.remove('invalid');

    /* Validate Username Length Constraint */
    var username = document.getElementById('username').value;
    if(username.length !== 0 && (username.length < 6 || username.length > 32)) {
        document.getElementById('username').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('username').classList.remove('invalid');

    /* Validate Name Length Constraint */
    var firstName = document.getElementById('first-name').value;
    if(firstName.length > 255) {
        document.getElementById('first-name').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('first-name').classList.remove('invalid');

    var lastName = document.getElementById('last-name').value;
    if(lastName.length > 255) {
        document.getElementById('last-name').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('last-name').classList.remove('invalid');
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
    /* Change Account Information Listeners */
    document.getElementById('primary-email-address').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('secondary-email-address').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('username').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('first-name').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('last-name').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('primary-email-address').addEventListener('input', function(event) {
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

    document.getElementById('secondary-email-address').addEventListener('input', function(event) {
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

    document.getElementById('first-name').addEventListener('input', function(event) {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var email = inputField.value;

        var classes = inputField.classList.toString().match(/good|bad/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                inputField.classList.remove(classes[index]);

        if(email.length === 0)
            return;

        if(email.length > 255)
            inputField.classList.add('bad');
        else
            inputField.classList.add('good');
    });

    document.getElementById('last-name').addEventListener('input', function(event) {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var email = inputField.value;

        var classes = inputField.classList.toString().match(/good|bad/);
        if(classes)
            for(var index = 0; index < classes.length; index++)
                inputField.classList.remove(classes[index]);

        if(email.length === 0)
            return;

        if(email.length > 255)
            inputField.classList.add('bad');
        else
            inputField.classList.add('good');
    });

    /* Change Password Form Listeners */
    document.getElementById('new-password').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    document.getElementById('new-password-confirm').addEventListener('change', function (event) {
        var targetElement = event.target || event.srcElement;
        if (!targetElement.value)
            targetElement.classList.remove('invalid');
    });

    /* Password Strength Indicator */
    document.getElementById('new-password').addEventListener('input', function(event) {
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
    document.getElementById('new-password-confirm').addEventListener('input', function() {
        /* Change Incator Bar Color */
        var inputField = event.target || event.srcElement;
        var password = document.getElementById('new-password').value;
        var passwordConfirm = document.getElementById('new-password-confirm').value;

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