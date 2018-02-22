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

document.getElementById('password-confirm').addEventListener('change', function(event) {
    var targetElement = event.target || event.srcElement;
    if(!targetElement.value)
        targetElement.classList.remove('invalid');
});