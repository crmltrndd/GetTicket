$(document).ready(function () {
    $("#search").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $(".searchStart").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})