const express = require('express')
const router = express.Router()
const passport = require('passport')
 
// Login Route
router.get('/login', isNotAuthorized, (req,res) => {
    res.render('admin/login', {
        title: 'GetTicket Admin Portal',
        css: '/admin_login.css'
    })
})

// Login Process
router.post('/login', isNotAuthorized,  passport.authenticate('local', {
    successRedirect: '/admin/home',             // if credentials are valid, redirect to home page
    failureRedirect: '/admin/login',            // if credentials are invalid, redirect to login again
    failureFlash: true                          // flash an error message using the message given by the strategy's verify callback
}))

// Home Route 
router.get('/home', isAuthorized, (req,res) => {
    res.render('admin/home', {
        title: 'GetTicket Admin Portal', 
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role,
    })
})

// Cinemas Route 
router.get('/cinemas', isAuthorized, (req,res) => {
    res.render('admin/cinemas', {
        title: 'GetTicket Admin Portal | Cinemas', 
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

// Movies Route 
router.get('/movies', isAuthorized, (req,res) => {
    res.render('admin/movies', {
        title: 'GetTicket Admin Portal | Movies',
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

// Reservations Route 
router.get('/reservations', isAuthorized, (req,res) => {
    res.render('admin/reservations', {
        title: 'GetTicket Admin Portal | Reservations', 
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

// Users Route 
router.get('/users', isAuthorized, isAdmin, (req,res) => {
    res.render('admin/users', {
        title: 'GetTicket Admin Portal | Users', 
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
    })
})

// Logout Process
router.delete('/home/logout', (req, res) => {
    req.logOut()
    res.redirect('/admin/login')
})

/* Logout Process */
router.get('/home/logout', (req, res) => {
    req.logout()
    res.redirect('/admin/login')
}) 


// To check if the user is authorized to access the route
function isAuthorized(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/admin/login')
}

// To check if the user does not need to go back to login route
function isNotAuthorized(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin/home')
    }
    next()
}

// To check if the user is admin
function isAdmin(req, res, next) {
    if (req.user.role != 'ADMIN') {
        return res.redirect('/admin/home')
    }
    next()
}

module.exports = router