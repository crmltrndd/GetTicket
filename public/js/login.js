// Disable Login button while any field is empty
$(function () {
    $('#loginForm input').keyup(function () {

        let empty = false
        $('#loginForm input').each(function () {
            if ($(this).val() == '') {
                empty = true
            }
        })

        if (empty) {
            $('#signIn').attr('disabled', 'disabled')
        } else {
            $('#signIn').removeAttr('disabled')
        }
    })
})()