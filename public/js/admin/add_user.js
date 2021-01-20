//----------------- Adding User ------------//

// Check if user's inputs meet the requirements
function userValidation() {
    const adminUserForm = document.getElementById('adminUserForm')
    let isClear = true

    // Check Name
    adminUserForm.inputName.value = adminUserForm.inputName.value.trim()
    if (adminUserForm.inputName.value == '') {
        isClear = setError(inputName, 'This field is required')
    } else {
        setSuccess(inputName)
    }

    // Check Username
    adminUserForm.inputUsername.value = adminUserForm.inputUsername.value.trim()
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

    // Check Confirm Password
    if (adminUserForm.inputConfirmPassword.value == '') {
        isClear = setError(inputConfirmPassword, 'Please re-enter your password')
    }
    else if (adminUserForm.inputConfirmPassword.value != adminUserForm.inputPassword.value ) {
        isClear = setError(inputConfirmPassword, 'Passwords do not match')
    }
    else {
        setSuccess(inputConfirmPassword)
    }

    // Check Email Address
    adminUserForm.inputEmail.value = adminUserForm.inputEmail.value.trim()
    if (adminUserForm.inputEmail.value == '') {
        isClear = setError(inputEmail, 'This field is required')
    } else if (!adminUserForm.inputEmail.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) { 
        isClear = setError(inputEmail, 'Please input a valid email address')
    } else {
        setSuccess(inputEmail)
    }

    // Check Contact
    adminUserForm.inputContact.value = adminUserForm.inputContact.value.trim()
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
    adminUserForm.inputAddress.value = adminUserForm.inputAddress.value.trim()
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
}

// Check if input key is a number
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false
    return true
}

// To limit the maximum date a user can choose (must be 18 years old)
$(function () {
    let today = new Date()
    let month = today.getMonth() + 1
    let day = today.getDate()
    let year = today.getFullYear() - 18
    if (month < 10)
        month = '0' + month.toString()
    if (day < 10)
        day = '0' + day.toString()

    var maxDate = year + '-' + month + '-' + day
    $('#inputBirthdate').attr('max', maxDate)
})