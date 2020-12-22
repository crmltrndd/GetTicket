//----------------- Updating User Status ------------//

// Clear status form if modal is closed
$('[data-dismiss=modal]').on('click', function (e) {
    var $t = $(this), target = $t[0].href || $t.data("target") || $t.parents('.modal') || []
    $(target).find("select").val('').end()
    // Unhighlight selected user after updating status
    $("#users tbody tr").removeClass('table-active')
})

// Refrain status modal from closing when esc or click outside
$(document).ready(function () {
    $(".show-modal").click(function () {
        $("#status").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
});

// Get and set the ID of User editing the status
$(document).ready(function () {
    $(".openStatusForm").click(function () {
        let ID = $(this).data('id')
        $(".modal-body #userId").val(ID)
    })
})

// Highlight selected user when updating status
$(document).ready(function () {
    $("#users tbody tr").click(function () {
        $(this).addClass('table-active').siblings().removeClass('table-active')
    })
})






