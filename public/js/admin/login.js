// Disable login button unless all fields are filled
$(function () {
    $('form > input').keyup(function () {
        var empty = false
        $('form > input').each(function () {
            if ($(this).val() == '') {
                empty = true
            }
        })
        if (empty) {
            $('#login').attr('disabled', 'disabled')
            $('#login').removeClass('hover')
            $('#login').removeClass('btndesign')
            $('#login').addClass('btn')
        } else {
            $('#login').removeAttr('disabled')
            $('#login').addClass('hover')
            $('#login').addClass('btndesign')
            $('#login').removeClass('btn')
        }
    })
})