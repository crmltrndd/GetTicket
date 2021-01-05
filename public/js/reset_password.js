// Check if inputs meet the requirements
function resetPasswordValidation() {
    const resetForm = document.getElementById('resetForm')
    let isClear = true

    // Check password
    if (resetForm.password.value == '') {
        setError(password, 'Please enter a new password')
        isClear = false
    } else if (resetForm.password.value.length < 8) {
        setError(password, 'Password must be atleast 8 characters long')
        isClear = false
    } else {
        setSuccess(password)
    }

    // Check confirm password
    if (resetForm.confirmPassword.value == '') {
        setError(confirmPassword, 'Please re-enter your new password')
        isClear = false
    }
    else if (resetForm.password.value != resetForm.confirmPassword.value) {
        setError(confirmPassword, 'Passwords do not match')
        isClear = false
    }
    else {
        setSuccess(confirmPassword)
    }

    return isClear
}

// Add error class and display error message in small
function setError(input, message) {
    const formGroup = input.parentElement
    const small = formGroup.querySelector('small')
    small.innerText = message
    formGroup.className = 'form-group error'
}

// Remove Error Class
function setSuccess(input) {
    const formField = input.parentElement
    formField.classList.remove('error')
}