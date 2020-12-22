const pool = require('../../config/database')

// Get and Display Movies Page with All Movies from database
exports.getMovies = (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                ...makeObjectParameter('GetTicket Admin | Movies', 'admin_home.css', req.user.username, req.user.role),
                movies: results,
                filter: 'All Movies'
            })
        }
    })
}

// Get and Display Movies Page with Now Showing Movies from database
exports.getMoviesNowShowing = (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Status = ?', ['Now Showing'], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                ...makeObjectParameter('GetTicket Admin | Now Showing', 'admin_home.css', req.user.username, req.user.role),
                movies: results,
                filter: 'Now Showing'
            })
        }
    })
}

// Get and Display Movies Page with Coming Soon Movies from database
exports.getMoviesComingSoon = (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Status = ?', ['Coming Soon'], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                ...makeObjectParameter('GetTicket Admin | Coming Soon', 'admin_home.css', req.user.username, req.user.role),
                movies: results,
                filter: 'Coming Soon'
            })
        }
    })
}

// Get and Display Movies Page with Inactive Movies from database
exports.getMoviesInactive = (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Status = ?', ['Inactive'], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                ...makeObjectParameter('GetTicket Admin | Inactive', 'admin_home.css', req.user.username, req.user.role),
                movies: results,
                filter: 'Inactive'
            })
        }
    })
}

// Get and Display Add Movie Page and pass a list of all existing movie titles
exports.getAddMovie = (req, res) => {
    pool.query('SELECT Title FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            // Passing list of movie titles for checking if Movie Title already exist
            let titleList = []
            results.forEach( title => { titleList.push(title.Title) } )
            res.render('admin/movies/add_movie', {
                ...makeObjectParameter('GetTicket Admin | Add Movie', 'admin_home.css', req.user.username, req.user.role),
                titles: titleList
            })
        }
    })
}

// Process Adding Movie by inserting it to database
exports.postAddMovie = (req, res) => {
    const { movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus } = req.body
    // Double check if there is no attached file
    if (!req.files) {
        req.flash('error', 'No uploaded file for movie poster.')
        res.render('admin/movies/add_movie', {
            ...makeObjectParameter('GetTicket Admin | Add Movie', 'admin_home.css', req.user.username, req.user.role),
            movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus
        })
    } else {
        // Double check if file type is image
        let poster = req.files.moviePoster
        if (poster.mimetype == "image/jpeg" || poster.mimetype == "image/png" || poster.mimetype == "image/gif") {
            poster.mv('public/images/movies/' + poster.name, (error) => {
                if (error) {
                    console.error(error)
                    req.flash('error', 'There\'s error in uploading file.')
                    res.status(500).redirect('/admin/movies')
                }

                // Call function to Make the Array Genre to String
                const stringMovieGenre = toStringGenre(movieGenre)

                pool.query('INSERT INTO Movies SET ? ', { Movie_Poster: poster.name, Title: movieTitle, Description: movieDescription, Duration: movieDuration, Genre: stringMovieGenre, Release_Date: releaseDate, Status: movieStatus }, (error, results) => {
                    if (error) {
                        console.error(error)
                        req.flash('error', 'There\'s problem in adding movie.')
                        res.status(401).redirect('/admin/movies/')
                    } else {
                        res.status(200).redirect('/admin/movies/')
                    }
                })
            })
        } else {
            req.flash('error', 'File format is not allowed. Please upload an image file.')
            res.render('admin/movies/add_movie', {
                ...makeObjectParameter('GetTicket Admin | Add Movie', 'admin_home.css', req.user.username, req.user.role),
                movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus,
            })
        }
    }
}

// Get and Display Edit Movie Page with data from database of a selected movie 
exports.getEditMovie = (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Movie_ID = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            // Format date inorder to display in input date field
            const date = formatDate(results[0].Release_Date)

            // Get all movie titles from database
            pool.query('SELECT Title FROM Movies', (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    // Passing list of movie titles for checking if Movie Title already exist
                    let titleList = []
                    result.forEach( title => { titleList.push(title.Title) } )
                    
                    // Remove current movie title from the title list
                    const index = titleList.indexOf(results[0].Title)
                    if (index > -1) 
                        titleList.splice(index, 1)

                    res.render('admin/movies/edit_movie', {
                        ...makeObjectParameter('GetTicket Admin | Edit Movie', 'admin_home.css', req.user.username, req.user.role),
                        movieID: results[0].Movie_ID,
                        movieTitle: results[0].Title,
                        movieDescription: results[0].Description,
                        movieGenre: results[0].Genre.split(" "),
                        movieDuration: results[0].Duration,
                        releaseDate: date,
                        movieStatus: results[0].Status,
                        moviePoster: results[0].Movie_Poster,
                        titles: titleList
                    })
                }
            })
        }
    })
}

// Process Editing Movie by updating it to database
exports.putEditMovie = (req, res) => {
    const { moviePoster, movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus, data } = req.body

    // If poster is modified
    if (data != 'GOOD') {

        // Double check if there is no attached file
        if (!req.files) {
            req.flash('error', 'No uploaded file for movie poster.')
            res.render('admin/movies/edit_movie', {
                ...makeObjectParameter('GetTicket Admin | Edit Movie', 'admin_home.css', req.user.username, req.user.role),
                movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus
            })
        } else {
            // Double check if file type is image
            let poster = req.files.moviePoster
            if (poster.mimetype == "image/jpeg" || poster.mimetype == "image/png" || poster.mimetype == "image/gif") {
                poster.mv('public/images/movies/' + poster.name, (error) => {
                    if (error) {
                        console.error(error)
                        req.flash('error', 'There\'s error in uploading file.')
                        res.status(500).redirect('/admin/movies')
                    }

                    // Call function to Make the Array Genre to String
                    const stringMovieGenre = toStringGenre(movieGenre)

                    // Update database
                    pool.query('UPDATE Movies SET Movie_Poster=?, Title=?, Description=?, Duration=?, Genre=?, Release_Date=?, Status=? WHERE Movie_ID = ?', [poster.name, movieTitle, movieDescription, movieDuration, stringMovieGenre, releaseDate, movieStatus, req.params.id], (error, results) => {
                        if (error) {
                            console.error(error)
                            req.flash('error', 'There\'s problem in updating movie.')
                            res.status(401).redirect('/admin/movies/')
                        } else {
                            res.status(200).redirect('/admin/movies/')
                        }
                    })
                })
            } else {
                req.flash('error', 'File format is not allowed. Please upload an image file.')
                res.render('admin/movies/add_movie', {
                    ...makeObjectParameter('GetTicket Admin | Add Movie', 'admin_home.css', req.user.username, req.user.role),
                    movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus,
                })
            }
        }
    } else {
        // Call function to Make the Array Genre to String
        const stringMovieGenre = toStringGenre(movieGenre)

        // Update database
        pool.query('UPDATE Movies SET Title = ?, Description = ?, Duration = ?, Genre = ?, Release_Date = ?, Status = ? WHERE Movie_ID = ?', [movieTitle, movieDescription, movieDuration, stringMovieGenre, releaseDate, movieStatus, req.params.id], (error, results) => {
            if (error) {
                console.error(error)
                req.flash('error', 'There\'s problem in updating movie.')
                res.status(401).redirect('/admin/movies')
            } else {
                res.status(200).redirect('/admin/movies')
            }
        })
    }
}

// Delete a movie
exports.deleteMovie = (req, res) => {
    pool.query('DELETE FROM Movies WHERE Movie_ID = ?', [req.body.movieID], (error, results) => {
        error ? console.error(error) : res.redirect('/admin/movies')
    })
}


/*-------- Functions --------*/

// Constructor for repetitive parameters
function makeObjectParameter(pageTitle, pageStyle, userName, userRole) {
    const object = {
        title: pageTitle,
        css: pageStyle,
        username: userName,
        role: userRole,
    }
    return object;
}

// Make the Array Genre to String
function toStringGenre(movieGenre){
    let stringMovieGenre = ''
    if (Array.isArray(movieGenre)) {
        movieGenre.forEach(genre => {
            stringMovieGenre += genre + ' '
        })
    } else {
        movieGenres = movieGenre
    }
    return stringMovieGenre.trim()
}

// Format Date by YEAR - MONTH - DAY
function formatDate(unformattedDate) {
    let date    = new Date(unformattedDate)
    let day     = date.getDate()
    let month   = date.getMonth() + 1
    let year    = date.getFullYear()
    if (month < 10) month = '0' + month.toString()
    if (day < 10)   day = '0' + day.toString()
    return year + "-" + month + "-" + day
}