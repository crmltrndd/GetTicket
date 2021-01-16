//-------------------------------------------- MIDDLEWARES FOR USERS ---------------------------------------------//
const pool = require('../config/database')
const jwt = require('jsonwebtoken')

// To check if the user is authorized to access the route
exports.isAuthorized = (req, res, next) => {
    const token = req.cookies.access
    // check if access token exist and verify it
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
            if (error) {
                console.error(error)
                req.flash('error', 'Please log in')
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        req.flash('error', 'Please log in')
        res.redirect('/login')
    }
}

// For displaying authenticated user on the nabvar 
exports.checkUser = (req, res, next) => {
    const token = req.cookies.access
    // check if access token exist and verify it
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
            if (error) {
                console.error(error)
                res.locals.user = null
                next()
            } else {
                pool.query('SELECT * FROM User_Profile WHERE Username = ? ', [decodedToken.username], (err, results) => {
                    if (err) {
                        console.error(err)
                    } else {
                        res.locals.user = results[0]
                        next()
                    }
                })
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}
