//----------------- Adding User ------------//

// Check if user's inputs meet the requirements
function userValidation() {
    const adminUserForm = document.getElementById('adminUserForm')
    let isClear = true

    // Check Name
    if (adminUserForm.inputName.value == '') {
        isClear = setError(inputName, 'This field is required')
    } else {
        setSuccess(inputName)
    }

    // Check Username
    if (adminUserForm.inputUsername.value == '') {
        isClear = setError(inputUsername, 'This field is required')
    } else {
        setSuccess(inputUsername)
    }

    // Check Password
    if (adminUserForm.inputPassword.value == '') {
        isClear = setError(inputPassword, 'This field is required')
    }
    else if (adminUserForm.inputPassword.value.length < 8) {
        isClear = setError(inputPassword, 'Password must be atleast 8 characters long')
    }
    else {
        setSuccess(inputPassword)
    }

    // Check Email Address
    if (adminUserForm.inputEmail.value == '') {
        isClear = setError(inputEmail, 'This field is required')
    } else if (!adminUserForm.inputEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        isClear = setError(inputEmail, 'Please input a valid email address')
    } else {
        setSuccess(inputEmail)
    }

    // Check Contact
    if (adminUserForm.inputContact.value == '') {
        isClear = setError(inputContact, 'This field is required')
    } else {
        setSuccess(inputContact)
    }

    // Check Birthdate
    if (adminUserForm.inputBirthdate.value == '') {
        isClear = setError(inputBirthdate, 'This field is required')
    } else {
        setSuccess(inputBirthdate)
    }

    // Check Address
    if (adminUserForm.inputAddress.value == '') {
        isClear = setError(inputAddress, 'This field is required')
    } else {
        setSuccess(inputAddress)
    }

    return isClear
}

// Add error class and display error message in small
function setError(input, message) {
    const formField = input.parentElement
    const small = formField.querySelector('small')
    small.innerText = message
    formField.className += ' error'
    return false
}

// Add success class
function setSuccess(input) {
    const formField = input.parentElement
    formField.classList.remove('error')
    //formField.className += ' success'
}

// Check if input key is a number
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}