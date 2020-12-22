const express = require('express')
const router = express.Router()
const pool = require('../config/database')

// Import Controllers 
const { getLogin, postLogin } = require('../controller/admin/login_controller')
const { getForgotPassword, postForgotPassword, postVerifyCode, postResetPassword } = require('../controller/admin/forgot_password_controller')
const { getHome, postHomeResetPassword } = require('../controller/admin/home_controller')
const { getAccount } = require('../controller/admin/account_controller')
const { getUsers, getAddUser, postAddUser, postUserStatusUpdate } = require('../controller/admin/users_controller')
const { getMovies, getMoviesNowShowing, getMoviesComingSoon, getMoviesInactive, getAddMovie, postAddMovie, getEditMovie, putEditMovie, deleteMovie} = require('../controller/admin/movies_controller')

// Import Functions
const { isAuthorized, isNotAuthorized, isAdmin, isResettingPassword } = require('../controller/functions')


//----------------------------------------------- LOGIN -----------------------------------------------//
router.get('/login', isNotAuthorized, getLogin)         // Login Route
router.post('/login', isNotAuthorized, postLogin)       // Login Process Handler


//------------------------------------------ FORGOT PASSWORD ------------------------------------------//
// Forgot Password Route
router.get('/forgot_password', isNotAuthorized, getForgotPassword)

// Forgot Password Processes: email > verify code > reset password
router.post('/forgot_password', isNotAuthorized, postForgotPassword)
router.post('/forgot_password/verify_code', isResettingPassword, postVerifyCode)
router.post('/forgot_password/reset_password', isResettingPassword, postResetPassword)


//------------------------------------------------ HOME ------------------------------------------------//
router.get('/home', isAuthorized, getHome)                                      // Home Route 
router.post('/home/reset_password', isAuthorized, postHomeResetPassword)        // Home > Reset Password Process Handler


//----------------------------------------------- LOGOUT -----------------------------------------------//
// Logout Process
router.get('/home/logout', (req, res) => {
    req.logout()
    res.redirect('/admin/login')
})

/* Logout Process */
router.delete('/home/logout', (req, res) => {
    req.logOut()
    res.redirect('/admin/login')
})


//---------------------------------------------- ACCOUNT ----------------------------------------------//
// Account Route 
router.get('/account', isAuthorized, getAccount)


//---------------------------------------------- CINEMAS ----------------------------------------------//
// Cinemas Route 
router.get('/cinemas', isAuthorized, (req, res) => {
    res.render('admin/cinemas', {
        title: 'GetTicket Admin Portal | Cinemas',
        css: 'admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

//---------------------------------------------- MOVIES -----------------------------------------------//
router.get('/movies', isAuthorized, getMovies)                                  // All Movies Route 
router.get('/movies/now_showing', isAuthorized, getMoviesNowShowing)            // Now Showing Movies Route 
router.get('/movies/coming_soon', isAuthorized, getMoviesComingSoon)            // Coming Soon Movies Route 
router.get('/movies/inactive', isAuthorized, getMoviesInactive)                 // Inactive Movies Route
router.get('/movies/add_movie', isAuthorized, getAddMovie)                      // Add Movies Route 
router.post('/movies/add_movie', isAuthorized, postAddMovie)                    // Add Movies Process Handler
router.get('/movies/:id', isAuthorized, getEditMovie)                           // Edit Movies Route 
router.put('/movies/:id', isAuthorized, putEditMovie)                           // Edit Movies Process Handler 
router.delete('/movies', isAuthorized, deleteMovie)                             // Delete Movie Handler

/*

router.get('/movies/now_showing', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Status = ?', ['Now Showing'], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                title: 'GetTicket Admin Portal | Movies - Now Showing',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results,
                filter: 'Now Showing'
            })
        }
    })
})

router.get('/movies/coming_soon', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Status = ?', ['Coming Soon'], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                title: 'GetTicket Admin Portal | Movies - Coming Soon',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results,
                filter: 'Coming Soon'
            })
        }
    })
})

router.get('/movies/inactive', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Status = ?', ['Inactive'], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                title: 'GetTicket Admin Portal | Movies - Inactive',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results,
                filter: 'Inactive'
            })
        }
    })
})

router.get('/movies/add_movie', isAuthorized, (req, res) => {
    res.render('admin/movies/add_movie', {
        title: 'GetTicket Admin Portal | Add Movie',
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

router.post('/movies/add_movie', isAuthorized, (req, res) => {
    const { movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus } = req.body
    // to check if there is no attached file
    if (!req.files) {
        req.flash('error', 'No uploaded file for movie poster.')
        res.render('admin/movies/add_movie', {
            title: 'GetTicket Admin Portal | Add Movie',
            css: '/admin_home.css',
            username: req.user.username,
            role: req.user.role,
            movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus
        })
    }
    // to check if file type is image
    else {
        let poster = req.files.moviePoster;
        let movieGenres = '';
        if (Array.isArray(movieGenre)) {
            movieGenre.forEach(genre => {
                movieGenres += genre + ' '
            })
        } else {
            movieGenres = movieGenre
        }

        if (poster.mimetype == "image/jpeg" || poster.mimetype == "image/png" || poster.mimetype == "image/gif") {
            poster.mv('public/images/movies/' + poster.name, (error) => {
                if (error) {
                    console.error(error)
                    req.flash('error', 'There\'s error in uploading file.')
                    res.status(500).redirect('/admin/movies');
                }
                console.log(req.body)
                pool.query('INSERT INTO Movies SET ? ', { Movie_Poster: poster.name, Title: movieTitle, Description: movieDescription, Duration: movieDuration, Genre: movieGenres, Release_Date: releaseDate, Status: movieStatus }, (error, results) => {
                    if (error) {
                        console.error(error)
                        req.flash('error', 'There\'s problem in adding movie.')
                        res.status(401).redirect('/admin/movies/')
                    } else {
                        console.log(results)
                        res.status(200).redirect('/admin/movies/')
                    }
                })
            })
        } else {
            req.flash('error', 'File format is not allowed. Please upload an image file.')
            res.render('admin/movies/add_movie', {
                title: 'GetTicket Admin Portal | Add Movie',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus,
            })
        }
    }
})

router.delete('/movies', isAuthorized, (req, res) => {
    pool.query('DELETE FROM Movies WHERE Movie_ID = ?', [req.body.movieID], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.redirect('/admin/movies')
        }
    })
})


router.get('/movies/:id', isAuthorized, (req, res) => {
    console.log('params:' + req.params.id);
    pool.query('SELECT * FROM Movies WHERE Movie_ID = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            let date = new Date(results[0].Release_Date)
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            if (month < 10) month = '0' + month.toString()
            if (day < 10) day = '0' + day.toString()
            let formatted_date = year + "-" + month + "-" + day

            console.log(results[0])
            res.render('admin/movies/edit_movie', {
                title: 'GetTicket Admin Portal | Movies',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movieID: results[0].Movie_ID,
                movieTitle: results[0].Title,
                movieDescription: results[0].Description,
                movieGenre: results[0].Genre.split(" "),
                movieDuration: results[0].Duration,
                releaseDate: formatted_date,
                movieStatus: results[0].Status,
                MoviePoster: results[0].Movie_Poster,
            })
        }
    })
})

router.put('/movies/:id', isAuthorized, (req, res) => {
    const { moviePoster, movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus, data } = req.body
    console.log("poster: "+ moviePoster)
    console.log("data: "+ data)
    if (data != 'GOOD') {

        // to check if there is no attached file
        if (!req.files) {
            req.flash('error', 'No uploaded file for movie poster.')
            res.render('admin/movies/add_movie', {
                title: 'GetTicket Admin Portal | Add Movie',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus
            })
        }
        // to check if file type is image
        else {
            let poster = req.files.moviePoster;
            let movieGenres = '';
            if (Array.isArray(movieGenre)) {
                movieGenre.forEach(genre => {
                    movieGenres += genre + ' '
                })
            } else {
                movieGenres = movieGenre
            }

            if (poster.mimetype == "image/jpeg" || poster.mimetype == "image/png" || poster.mimetype == "image/gif") {
                poster.mv('public/images/movies/' + poster.name, (error) => {
                    if (error) {
                        console.error(error)
                        req.flash('error', 'There\'s error in uploading file.')
                        res.status(500).redirect('/admin/movies');
                    }
                    console.log(req.body)
                    // Update db
                    pool.query('UPDATE Movies SET Movie_Poster=?, Title=?, Description=?, Duration=?, Genre=?, Release_Date=?, Status=? WHERE Movie_ID = ?', [poster.name, movieTitle, movieDescription, movieDuration, movieGenres, releaseDate, movieStatus, req.params.id], (error, results) => {
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
                    title: 'GetTicket Admin Portal | Add Movie',
                    css: '/admin_home.css',
                    username: req.user.username,
                    role: req.user.role,
                    movieTitle, movieDescription, movieGenre, movieDuration, releaseDate, movieStatus,
                })
            }
        }

    } else {
        let rDate = new Date(releaseDate)

        let movieGenres = '';
            if (Array.isArray(movieGenre)) {
                movieGenre.forEach(genre => {
                    movieGenres += genre + ' '
                })
            } else {
                movieGenres = movieGenre
            }
        // Update db
        pool.query('UPDATE Movies SET Title = ?, Description = ?, Duration = ?, Genre = ?, Release_Date = ?, Status = ? WHERE Movie_ID = ?', [movieTitle, movieDescription, movieDuration, movieGenres.trim(), rDate, movieStatus, req.params.id], (error, results) => {
            if (error) {
                console.error(error)
                req.flash('error', 'There\'s problem in updating movie.')
                res.status(401).redirect('/admin/movies')
            } else {
                res.status(200).redirect('/admin/movies')
            }
        })



    }
})
*/


//-------------------------------------------- RESERVATIONS -------------------------------------------//
// Reservations Route 
router.get('/reservations', isAuthorized, (req, res) => {
    res.render('admin/reservations', {
        title: 'GetTicket Admin Portal | Reservations',
        css: 'admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

//----------------------------------------------- USERS -----------------------------------------------//
router.get('/users', isAuthorized, isAdmin, getUsers)                               // Users Route
router.get('/users/add_user', isAuthorized, isAdmin, getAddUser)                    // Add User Route
router.post('/users/add_user', isAuthorized, isAdmin, postAddUser)                  // Add User Process Handler
router.post('/users/update_status', isAuthorized, isAdmin, postUserStatusUpdate)    // Update User Status Process Handler

module.exports = router