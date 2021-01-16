// Check if user's inputs meet the requirements before edit profile process
function editProfileValidation() {
    const profileForm = document.getElementById('profile')
    let isClear = true

    // Check username 
    if (profileForm.username.value == '') {
        isClear = setError(username, 'Username is required')
    } else if (profileForm.username.value.length < 5) {
        isClear = setError(username, 'Username must be atleast 5 characters long')
    } else if (!profileForm.username.value.match(/^[A-Za-z0-9_]{5,70}$/)) {
        isClear = setError(username, 'Use only letters, digits and underscore')
    } else if (usernameList.includes(profileForm.username.value)) {
        isClear = setError(username, 'The username is already in use')
    } else {
        setSuccess(username)
    }

    // Check email
    if (profileForm.email.value == '') {
        isClear = setError(email, 'Email Address is required')
    } else if (!profileForm.email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        isClear = setError(email, 'Please input a valid email address')
    } else if (emailList.includes(profileForm.email.value)) {
        isClear = setError(email, 'The email is already in use')
    } else {
        setSuccess(email)
    }

    // Check password
    if (profileForm.newPassword.value != '' && profileForm.newPassword.value.length < 8) {
        isClear = setError(newPassword, 'Password must be atleast 8 characters long')
    } else if (profileForm.newPassword.value == '' && profileForm.verifyPassword.value != '') {
        isClear = setError(newPassword, 'New Password is required')
    }
    else {
        setSuccess(newPassword)
    }

    // Check confirm password
    if (profileForm.newPassword.value != '' && profileForm.verifyPassword.value == '') {
        isClear = setError(verifyPassword, 'Verify Password is required')
    }
    else if (profileForm.verifyPassword.value != profileForm.newPassword.value) {
        isClear = setError(verifyPassword, 'Passwords do not match')
    }
    else {
        setSuccess(verifyPassword)
    }

    // Check firstname
    if (profileForm.firstname.value == '') {
        isClear = setError(firstname, 'First Name is required')
    } else {
        setSuccess(firstname)
    }

    // Check lastname
    if (profileForm.lastname.value == '') {
        isClear = setError(lastname, 'Last Name is required')
    } else {
        setSuccess(lastname)
    }
    
    // Check contact
    if (profileForm.contact.value == '') {
        isClear = setError(contact, 'Contact is required')
    } else if (!profileForm.contact.value.match(/^[+]?[\d]+([\-][\d]+)*\d$/)) { 
        // Accepts only: optional '+' on first | 'numbers' or '-' on middle | numbers on last
        isClear = setError(contact, 'Please input a valid contact number')
    } else {
        setSuccess(contact)
    }

    // Check birthdate
    if (profileForm.birthdate.value == '') {
        isClear = setError(birthdate, 'Birthdate is required')
    } else {
        setSuccess(birthdate)
    }

    // Check address
    if (profileForm.address.value == '') {
        isClear = setError(address, 'Address is required')
    } else {
        setSuccess(address)
    }
    
    return isClear
}


// Add error class and display error message in small element
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
    $('#birthdate').attr('max', maxDate)
})

// Check if input key is a number | + | - 
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 43 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false
    return true
}