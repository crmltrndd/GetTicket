// Check if user's inputs meet the requirements before registration process
function registerValidation() {
    const registerForm = document.getElementById('registerForm')
    let isClear = true

    // Check username 
    registerForm.username.value = registerForm.username.value.trim()
    if (registerForm.username.value == '') {
        isClear = setError(username, 'Username is required')
    } else if (registerForm.username.value.length < 5) {
        isClear = setError(username, 'The username must be atleast 5 characters long')
    } else if (!registerForm.username.value.match(/^[A-Za-z0-9_]{5,70}$/)) {
        isClear = setError(username, 'Use only letters, digits and underscore')
    } else if (usernameList.includes(registerForm.username.value)) {
        isClear = setError(username, 'The username is already in use')
    } else {
        setSuccess(username)
    }

    // Check email
    registerForm.email.value = registerForm.email.value.trim()
    if (registerForm.email.value == '') {
        isClear = setError(email, 'Email Address is required')
    } else if (!registerForm.email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        isClear = setError(email, 'Please input a valid email address')
    } else if (emailList.includes(registerForm.email.value)) {
        isClear = setError(email, 'The email is already in use')
    } else {
        setSuccess(email)
    }

    // Check password
    if (registerForm.password.value == '') {
        isClear = setError(password, 'Password is required')
    }
    else if (registerForm.password.value.length < 8) {
        isClear = setError(password, 'Password must be atleast 8 characters long')
    }
    else {
        setSuccess(password)
    }

    // Check confirm password
    if (registerForm.repassword.value == '') {
        isClear = setError(repassword, 'Confirmation Password is required')
    }
    else if (registerForm.repassword.value != registerForm.password.value) {
        isClear = setError(repassword, 'Passwords do not match')
    }
    else {
        setSuccess(repassword)
    }

    // Check firstname
    if (registerForm.firstname.value == '') {
        isClear = setError(firstname, 'First Name is required')
    } else {
        setSuccess(firstname)
    }

    // Check lastname
    if (registerForm.lastname.value == '') {
        isClear = setError(lastname, 'Last Name is required')
    } else {
        setSuccess(lastname)
    }
    
    // Check contact
    if (registerForm.contact.value == '') {
        isClear = setError(contact, 'Contact is required')
    } else if (!registerForm.contact.value.match(/^[+]?[\d]+([\-][\d]+)*\d$/)) { 
        // Accepts only: optional '+' on first | 'numbers' or '-' on middle | numbers on last
        isClear = setError(contact, 'Please input a valid contact number')
    } else {
        setSuccess(contact)
    }

    // Check birthdate
    if (registerForm.birthdate.value == '') {
        isClear = setError(birthdate, 'Birthdate is required')
    } else {
        setSuccess(birthdate)
    }

    // Check address
    if (registerForm.address.value == '') {
        isClear = setError(address, 'Address is required')
    } else {
        setSuccess(address)
    }

    // Check licenseAgreement
    if (registerForm.termsConditions.checked === false) {
        isClear = setError(termsConditions, 'Please agree to our terms and conditions to proceed.')
    } else {
        setSuccess(termsConditions)
    }

    // Check licenseAgreement
    if (registerForm.privacyPolicy.checked === false) {
        isClear = setError(privacyPolicy, 'Please agree to our privacy and policy to proceed.')
    } else {
        setSuccess(privacyPolicy)
    }

    //console.log(isClear)  //debugger
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

// When clear is clicked, remove all error messages
function removeError(){
    setSuccess(username)
    setSuccess(email)
    setSuccess(password)
    setSuccess(repassword)
    setSuccess(firstname)
    setSuccess(lastname)
    setSuccess(contact)
    setSuccess(birthdate)
    setSuccess(address)
    setSuccess(termsConditions)
    setSuccess(privacyPolicy)
}

// Check if input key is a number | + | - 
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 43 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false
    return true
}