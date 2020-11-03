const express = require('express')
const router = express.Router()
const passport = require('passport')
 
// Login Route
router.get('/login', isNotAuthorized, (req,res) => {
    res.render('admin/login', {message: ''})
})

// Login Process
router.post('/login', isNotAuthorized,  passport.authenticate('local', {
    successRedirect: '/admin/home',             // if credentials are valid, redirect to home page
    failureRedirect: '/admin/login',            // if credentials are invalid, redirect to login again
    failureFlash: true                          // flash an error message using the message given by the strategy's verify callback
}))

// Home Route 
router.get('/home', isAuthorized, (req,res) => {
    res.render('admin/home', {username: req.user.username})
})

// Logout Process
router.delete('/home/logout', (req, res) => {
    req.logOut()
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

module.exports = router