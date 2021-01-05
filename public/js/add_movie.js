//----------------- Adding Movie ------------//

// Check if user's inputs meet the requirements
function movieValidation() {
    const addMovieForm = document.getElementById('addMovieForm')
    let isClear = true

    // Check Movie Title
    if (addMovieForm.movieTitle.value == '') {
        isClear = setError(movieTitle, 'This field is required')
    } else {
        setSuccess(movieTitle)
    }

    // Check Movie Description
    if (addMovieForm.movieDescription.value == '') {
        isClear = setError(movieDescription, 'This field is required')
    } else {
        setSuccess(movieDescription)
    }

    // Check Movie Status
    if (addMovieForm.movieStatus.value == '') {
        isClear = setError(movieStatus, 'This field is required')
    } else {
        setSuccess(movieStatus)
    }

    // Check Release Date
    if (addMovieForm.releaseDate.value == '') {
        isClear = setError(releaseDate, 'This field is required')
    } else {
        setSuccess(releaseDate)
    }

    /* Check Movie Duration
    if (addMovieForm.movieDuration.value == '00:00:00') {
        isClear = setError(movieDuration, 'This field is required')
    } else {
        setSuccess(movieDuration)
    }*/


    // Check Movie Poster
    if (addMovieForm.moviePoster.value == '') {
        isClear = setError(moviePoster, 'Please upload an image file')
    } else if (!addMovieForm.moviePoster.value.match(/\.(jpe?g|png|gif|bmp)$/i)) {
        isClear = setError(moviePoster, 'Invalid file format')
    } else {
        setSuccess(moviePoster)
    }
    console.log(isClear)
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

// Add success class
function setSuccess(input) {
    const formField = input.parentElement
    formField.classList.remove('error')
    //formField.className += ' success'
}

// Load image preview of the choosen file
function loadFile(event) {
    var image = document.getElementById('image');
    image.src = URL.createObjectURL(event.target.files[0])
    image.removeAttribute('style')
    image.setAttribute('style', 'width:200px; height:300px;')
    setSuccess(moviePoster)
}

$(document).ready(function () {
    var multipleCancelButton = new Choices('#movieGenre', {
        removeItemButton: true,
        //maxItemCount: 5,
        //searchResultLimit: 5,
        //renderChoiceLimit: 5
    })
})