const express = require('express')
const router = express.Router()
const passport = require('passport')
const transporter = require('../config/mailer')
 
// Login Route
router.get('/login', isNotAuthorized, (req,res) => {
    res.render('admin/login', {
        title: 'GetTicket Admin Portal',
        css: '/admin_login.css'
    })
})

// Login Process
router.post('/login', isNotAuthorized,  passport.authenticate('local', {
    successRedirect: '/admin/home',             
    failureRedirect: '/admin/login',            
    failureFlash: true                          
}))

// Forgot Password Route
router.get('/forgot_password', (req,res) => {
    res.render('admin/forgot_password', {
        title: 'GetTicket Admin Portal | Password Reset',
        css: ''
    })
})

/* Forgot Password Process
router.post('/forgot_password', (req,res) => {
    const email = req.body.email
    const otp = parseInt(Math.random() * 1000000)
    pool.query('SELECT * FROM Admin_Profile WHERE ID = ?', [email], (error, results) => {
        if (error){
            return console.log(error)
        }
        if( results[0] == 1){
            // Send verification code to email (with defined transport object)
            const mailOptions = {
                to: email,
                subject: "GetTicket Verification Code",
                html: "<h3> OTP for account recovery is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
            }
             
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error)
                }
                console.log('Message sent: %s', info.messageId)
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                res.render('admin/verify_code')
            })
        }
        else {
            // Flash error message "Account does not exist"
            res.redirect('/forgot_password', {
                message: 'Account does not exist' 
            })
        }
    })

})
*/

// Home Route 
router.get('/home', isAuthorized, (req,res) => {
    res.render('admin/home', {
        title: 'GetTicket Admin Portal', 
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role,
    })
})

// Account Route 
router.get('/account', isAuthorized, (req,res) => {
    res.render('admin/account', {
        title: 'GetTicket Admin Portal | Account', 
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role
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