// For searching movies
$(document).ready(function () {
    $("#searchMovie").on("keyup", function () {
        let value = $(this).val().toLowerCase()
        $("#moviesTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})

// Get and set the ID of Movie to delete
$(document).ready(function () {
    $(".openDeleteConfirmation").click(function () {
        let ID = $(this).data('id')
        $(".modal-footer #movieID").val(ID)
    })
})