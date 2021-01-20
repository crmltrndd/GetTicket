// For searching cinema branches
$(document).ready(function () {
    $("#searchCinema").on("keyup", function () {
        let value = $(this).val().toLowerCase()
        $("#cinemasTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})