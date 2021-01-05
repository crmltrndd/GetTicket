$(function () {
    $('#loginForm input').keyup(function () {

        var empty = false;
        $('#loginForm input').each(function () {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#signIn').attr('disabled', 'disabled');
        } else {
            $('#signIn').removeAttr('disabled');
        }
    });
})()