const express = require('express')
const router = express.Router()

// Import Controllers 
const loginController = require('../controller/admin/login_controller')
const forgotPasswordController = require('../controller/admin/forgot_password_controller')
const homeController = require('../controller/admin/home_controller')
const accountController = require('../controller/admin/account_controller')
const usersController = require('../controller/admin/users_controller')
const moviesController = require('../controller/admin/movies_controller')

// Import Middlewares
const { isAuthorized, isNotAuthorized, isAdmin, isResettingPassword } = require('../middleware/admin')


//-------------------- LOGIN --------------------//
router.get('/login', isNotAuthorized, loginController.getLogin)         // Login Route
router.post('/login', isNotAuthorized, loginController.postLogin)       // Login Process Handler


//-------------------- FORGOT PASSWORD --------------------//
// Forgot Password Route
router.get('/forgot_password', isNotAuthorized, forgotPasswordController.getForgotPassword)
// Forgot Password Processes: email > verify code > reset password
router.post('/forgot_password', isNotAuthorized, forgotPasswordController.postForgotPassword)
router.post('/forgot_password/verify_code', isResettingPassword, forgotPasswordController.postVerifyCode)
router.post('/forgot_password/reset_password', isResettingPassword, forgotPasswordController.postResetPassword)


//-------------------- HOME --------------------//
router.get('/home', isAuthorized, homeController.getHome)                                      // Home Route 
router.post('/home/reset_password', isAuthorized, homeController.postHomeResetPassword)        // Home > Reset Password Process Handler


//-------------------- LOGOUT --------------------//
// Logout Process
router.get('/home/logout', (req, res) => {
    req.logout()
    res.redirect('/admin/login')
})


//-------------------- ACCOUNT --------------------//
// Account Route 
router.get('/account', isAuthorized, accountController.getAccount)


//-------------------- CINEMAS --------------------//
// Cinemas Route 
router.get('/cinemas', isAuthorized, (req, res) => {
    res.render('admin/cinemas', {
        title: 'GetTicket Admin | Cinemas',
        css: 'admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

//-------------------- MOVIES --------------------//
router.get('/movies', isAuthorized, moviesController.getMovies)                                  // All Movies Route 
router.get('/movies/now_showing', isAuthorized, moviesController.getMoviesNowShowing)            // Now Showing Movies Route 
router.get('/movies/coming_soon', isAuthorized, moviesController.getMoviesComingSoon)            // Coming Soon Movies Route 
router.get('/movies/inactive', isAuthorized, moviesController.getMoviesInactive)                 // Inactive Movies Route
router.get('/movies/add_movie', isAuthorized, moviesController.getAddMovie)                      // Add Movies Route 
router.post('/movies/add_movie', isAuthorized, moviesController.postAddMovie)                    // Add Movies Process Handler
router.get('/movies/:id', isAuthorized, moviesController.getEditMovie)                           // Edit Movies Route 
router.put('/movies/:id', isAuthorized, moviesController.putEditMovie)                           // Edit Movies Process Handler 
router.delete('/movies', isAuthorized, moviesController.deleteMovie)                             // Delete Movie Handler


//-------------------- RESERVATIONS --------------------//
// Reservations Route 
router.get('/reservations', isAuthorized, (req, res) => {
    res.render('admin/reservations', {
        title: 'GetTicket Admin | Reservations',
        css: 'admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

//-------------------- USERS --------------------//
router.get('/users', isAuthorized, isAdmin, usersController.getUsers)                               // Users Route
router.get('/users/add_user', isAuthorized, isAdmin, usersController.getAddUser)                    // Add User Route
router.post('/users/add_user', isAuthorized, isAdmin, usersController.postAddUser)                  // Add User Process Handler
router.post('/users/update_status', isAuthorized, isAdmin, usersController.postUserStatusUpdate)    // Update User Status Process Handler

module.exports = router