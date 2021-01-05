// Check if inputs meet the requirements
function passwordValidation() {
    const resetForm = document.getElementById('resetForm')
    let isClear = true

    // Check password
    if (resetForm.password.value == '') {
        setErrorFor(password, 'Please enter a new password')
        isClear = false
    } else if (resetForm.password.value.length < 8) {
        setErrorFor(password, 'Password must be atleast 8 characters long')
        isClear = false
    } else {
        setSuccessFor(password)
    }

    // Check confirm password
    if (resetForm.confirmPassword.value == '') {
        setErrorFor(confirmPassword, 'Please re-enter your new password')
        isClear = false
    }
    else if (resetForm.password.value != resetForm.confirmPassword.value) {
        setErrorFor(confirmPassword, 'Passwords do not match')
        isClear = false
    }
    else {
        setSuccessFor(confirmPassword)
    }

    return isClear
}

// Add error class and display error message in small
function setErrorFor(input, message) {
    const formGroup = input.parentElement
    const small = formGroup.querySelector('small')
    small.innerText = message
    formGroup.className = 'form-group error'
}

// Remove Error Class
function setSuccessFor(input) {
    const formField = input.parentElement
    formField.classList.remove('error')
}