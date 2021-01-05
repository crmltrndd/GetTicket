const express = require('express')
const router = express.Router()
const pool = require('../config/database')

// Import Controllers 
const { getLogin, postLogin } = require('../controller/admin/login_controller')
const { getForgotPassword, postForgotPassword, postVerifyCode, postResetPassword } = require('../controller/admin/forgot_password_controller')
const { getHome, postHomeResetPassword } = require('../controller/admin/home_controller')
const { getAccount } = require('../controller/admin/account_controller')
const { getUsers, getAddUser, postAddUser, postUserStatusUpdate } = require('../controller/admin/users_controller')

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
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

//---------------------------------------------- MOVIES -----------------------------------------------//
// Movies Route 
/*
router.get('/movies', isAuthorized, getMovies)                                  // Movies Route
router.get('/movies/now_showing', isAuthorized, getNowShowing)                  // Now Showing Movie Route
router.get('/movies/coming_soon', isAuthorized, getComingSoon)                  // Coming Soon Movie Route
router.get('/movies/inactive', isAuthorized, getInactive)                       // Inactive Movie Route
router.get('/movies/add_movie', isAuthorized, getAddMovie)                      // Add Movie Route
router.post('/movies/add_movie', isAuthorized, postAddMovie)                    // Add Movie Process Handler
*/
router.get('/movies', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies', {
                title: 'GetTicket Admin Portal | Movies',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results
            })
        }
    })
})

router.get('/movies/now_showing', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies/now_Showing', {
                title: 'GetTicket Admin Portal | Movies - Now Showing',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results
            })
        }
    })
})

router.get('/movies/coming_soon', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies/coming_soon', {
                title: 'GetTicket Admin Portal | Movies - Coming Soon',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results
            })
        }
    })
})

router.get('/movies/inactive', isAuthorized, (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/movies/inactive', {
                title: 'GetTicket Admin Portal | Movies - Inactive',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movies: results
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
    const { movieTitle, movieDescription, movieDuration, releaseDate, movieStatus, moviePoster } = req.body
    
    if (!req.files) {
        req.flash('error', 'No uploaded file for movie poster.')
        res.render('admin/movies/add_movie', {
            title: 'GetTicket Admin Portal | Add Movie',
            css: '/admin_home.css',
            username: req.user.username,
            role: req.user.role,
            movieTitle, movieDescription, movieDuration, releaseDate, movieStatus
        })
    } else {
        let poster = req.files.moviePoster;
        if (poster.mimetype == "image/jpeg" || poster.mimetype == "image/png" || poster.mimetype == "image/gif") {
            poster.mv('public/images/movies/' + poster.name, (error) => {
                if (error) {
                    console.error(error)
                    req.flash('error', 'There\'s error in uploading file.')
                    res.status(500).redirect('/admin/movies');
                }
                console.log(req.body)
                pool.query('INSERT INTO Movies SET ? ', { Poster: poster.name, Title: movieTitle, Description: movieDescription, Duration: movieDuration, Release_Date: releaseDate, Status: movieStatus}, (error, results) => {
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
                title: 'GetTicket Admin Portal | Add Movie',
                css: '/admin_home.css',
                username: req.user.username,
                role: req.user.role,
                movieTitle, movieDescription, movieDuration, releaseDate, movieStatus,
            })
        }
    }
})

//-------------------------------------------- RESERVATIONS -------------------------------------------//
// Reservations Route 
router.get('/reservations', isAuthorized, (req, res) => {
    res.render('admin/reservations', {
        title: 'GetTicket Admin Portal | Reservations',
        css: '/admin_home.css',
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