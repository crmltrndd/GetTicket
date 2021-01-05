//----------------- Editing Movie Details ------------//

// Check if user's inputs meet the requirements
function movieValidation() {
    const movieForm = document.getElementById('movieForm')
    let isClear = true

    let titles = '<%=titles%>'
    console.log(typeof titles)

    // Check Movie Title
    if (movieForm.movieTitle.value == '') {
        isClear = setError(movieTitle, 'This field is required')
    } else if (titleList.includes(movieForm.movieTitle.value)) {
        isClear = setError(movieTitle, 'Movie title already exists')
    }else {
        setSuccess(movieTitle)
    }

    // Check Movie Description
    if (movieForm.movieDescription.value == '') {
        isClear = setError(movieDescription, 'This field is required')
    } else {
        setSuccess(movieDescription)
    }

    // Check Movie Genre
    if (movieForm.movieGenre.value == '') {
        isClear = genreError()
    } else {
        genreSuccess()
    }

    // Check Movie Status
    if (movieForm.movieStatus.value == '') {
        isClear = setError(movieStatus, 'This field is required')
    } else {
        setSuccess(movieStatus)
    }

    // Check Release Date
    if (movieForm.releaseDate.value == '') {
        isClear = setError(releaseDate, 'This field is required')
    } else {
        setSuccess(releaseDate)
    }

    // Check Movie Poster
    let image = document.getElementById('image')
    let prevImage = document.getElementById('prevImage')
    if (movieForm.moviePoster.value == '' && image.style.display == "none" && prevImage.style.display != "none") {
        document.getElementById("data").value = "GOOD";
    }
    else if (movieForm.moviePoster.value == '') {
        isClear = setError(moviePoster, 'Please upload an image file')
    } else if (!movieForm.moviePoster.value.match(/\.(jpe?g|png|gif|bmp)$/i)) {
        isClear = setError(moviePoster, 'Invalid file format')
    } else {
        setSuccess(moviePoster)
    }

    return isClear
}

// Add error class and display error message in small
function setError(input, message) {
    const formField = input.parentElement
    const small = formField.querySelector('small')
    small.innerText = message
    formField.className += ' error'
    return false
}

// Remove error class
function setSuccess(input) {
    const formField = input.parentElement
    formField.classList.remove('error')
}

// Load image preview of the choosen file
function loadFile(event) {
    let posterField = document.getElementById('moviePoster')
    let image = document.getElementById('image')
    if (posterField.value == '') {
        removeImagePreview(image)
    } else {
        image.src = URL.createObjectURL(event.target.files[0])
        image.removeAttribute('style')
        image.setAttribute('style', 'width:200px; height:300px;')
        setSuccess(moviePoster)
        let prevImage = document.getElementById('prevImage')
        prevImage.removeAttribute('style')
        prevImage.setAttribute('style', 'display:none;')
    }
}

// For genre selection
$(document).ready(function () {
    var multipleCancelButton = new Choices('#movieGenre', {
        removeItemButton: true,
        maxItemCount: 5,
    })
})

// To display error message for genre
function genreError() {
    genreErr = document.getElementById('errorMessage')
    genreErr.innerText = '(Please select atleast one)'
    return false
}

// To remove error message for genre
function genreSuccess() {
    genreErr = document.getElementById('errorMessage')
    genreErr.innerText = ''
}

// To hide movie poster preview
function removeImagePreview(image) {
    image.removeAttribute('style')
    image.setAttribute('style', 'display:none;')
}