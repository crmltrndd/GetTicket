const passport = require('passport')

// Display Login Page
exports.getLogin = (req, res) => {
    res.render('admin/login', {
        title: 'GetTicket Admin Portal',
        css: '/admin_login.css'
    })
}


// Handle login on POST
exports.postLogin =  passport.authenticate('local', {
    successRedirect: '/admin/home',
    failureRedirect: '/admin/login',
    failureFlash: true
})