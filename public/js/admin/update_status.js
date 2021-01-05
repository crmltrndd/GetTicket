//----------------- Updating User Status ------------//

// Get and set the ID of User editing the status
$(document).ready(function () {
    $(".updateStatusForm").click(function () {
        let id = $(this).data('id')
        let status = $(this).data('stat')
        $("#userId").val(id)
        $("#statusValue").val(status)
    })
})

// Highlight selected user when updating status
$(document).ready(function () {
    $("#users tbody tr").click(function () {
        $(this).addClass('table-active').siblings().removeClass('table-active')
    })
})






