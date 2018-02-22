function validateForm() {
    /* Validate Passwords Fields*/
    var password = document.getElementById('password').value;
    var passwordConfirm = document.getElementById('password-confirm').value;
    if(password !== passwordConfirm) {
        document.getElementById('password-confirm').classList.add('invalid');
        return false;
    }
    else
        document.getElementById('password-confirm').classList.remove('invalid');


    return true;
}