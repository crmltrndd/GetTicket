//-------------------------------------------- MIDDLEWARES FOR ADMIN ---------------------------------------------//

// To check if the user is authorized to access the route
exports.isAuthorized = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/admin/login')
}

// To check if the user does not need to go back to login route
exports.isNotAuthorized = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/admin/home')
    }
    next()
}

// To check if the user is admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role != 'ADMIN') {
        return res.redirect('/admin/home')
    }
    next()
}

// To check if currently resetting password
exports.isResettingPassword = (req, res, next) => {
    if (req.body.resetting) {
        return next()
    }
    res.redirect('/admin/forgot_password')
}
