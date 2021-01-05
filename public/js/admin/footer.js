//----------------- Sidebar and Modal ------------//

// For sidebar toggle
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active')
    })
})

// Clear reset password form if modal is closed
$('[data-dismiss=modal]').on('click', function (e) {
    var $t = $(this), target = $t[0].href || $t.data("target") || $t.parents('.modal') || []
    $(target).find("input").val('').end()
})

// Refrain reset password modal from closing when esc or click outside
$(document).ready(function () {
    $(".show-modal").click(function () {
        $("#resetPasswordModal").modal({
            backdrop: 'static',
            keyboard: false
        })
    })
})

//----------------- Resetting Password ------------//

// Check if user's inputs for meet the requirements
function passwordValidation() {
    const resetForm = document.getElementById('resetForm')
    let isClear=0

    // Check current password
    if (resetForm.currentPass.value == '') {
        setErrorFor(currentPass, 'Please enter your current password')
        isClear++
    } else {
        removeError(currentPass)
    }

    // Check confirm password
    if (resetForm.confirmPass.value == '') {
        setErrorFor(confirmPass, 'Please re-enter your new password')
        isClear++
    } 
    else if (resetForm.newPass.value != resetForm.confirmPass.value) {
        setErrorFor(confirmPass, 'Passwords do not match')
        isClear++
    }
    else {
        removeError(newPass)
    }

    // Check new password
    if (resetForm.newPass.value == '') {
        setErrorFor(newPass, 'Please enter a new password')
        isClear++
    } else if (resetForm.newPass.value.length < 8) {
        setErrorFor(newPass, 'Password must be atleast 8 characters long')
        isClear++
    } else {
        removeError(newPass)
    }

    return isClear >0 ? false : true
}

// Add error class and display error message in small
function setErrorFor(input, message) {
    const formGroup = input.parentElement
    const small = formGroup.querySelector('small')
    small.innerText = message
    formGroup.className = 'form-group error'
}

// Remove class
function removeError(input) {
    const formGroup = input.parentElement
    formGroup.classList.remove('error')
}