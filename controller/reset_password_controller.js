const pool = require('../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// Display reset password on GET / Redirect (for if session expired)
exports.getResetPassword = (req, res) => {
    res.render('reset_password', {
        title: 'GetTicket Admin | Reset Password',
        css: 'user_reset_password.css',
    })
}


// Handle reset password on POST.
exports.postResetPassword = (req, res) => {
    const { id, token, password } = req.body
    pool.query('SELECT * FROM User_Profile WHERE User_ID = ?', [id], (error, results) => {
        if (error) {
            return console.error(error)
        }

        if (results.length == 1) {
            // Get one-time-use token secret key used
            const secret = results[0].Password + "-" + process.env.RESET_PASSWORD_TOKEN_SECRET

            // Verify token if not yet expired or tampered
            jwt.verify(token, secret, async (err, decodedToken) => {
                if (err) {
                    console.error(err)
                    console.log(token)
                    res.redirect('/reset_password')

                } 

                // if verified, display reset password form
                const hashedPassword = await bcrypt.hash(password, 10)
                pool.query('UPDATE User_Profile SET Password = ? WHERE User_ID = ?', [hashedPassword, id], (errr) => {
                    if (errr) {
                        console.error(errr)
                    }
                    const accessToken = createToken(results[0].Username)
                    res.cookie('access', accessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000 })
                    res.status(200).redirect('/')
                })
            })
        }
    })
}

// Display reset password form on GET
exports.getResetPasswordForm = (req, res) => {
    pool.query('SELECT * FROM User_Profile WHERE User_ID = ?', [req.params.id], (error, results) => {
        if (error) {
            return console.error(error)
        }
        if (results.length == 1) {

            // Get one-time-use token secret key used
            const secret = results[0].Password + "-" + process.env.RESET_PASSWORD_TOKEN_SECRET

            // Verify token if not yet expired or tampered
            jwt.verify(req.params.token, secret, (err, decodedToken) => {
                if (err) {
                    return res.redirect('/reset_password')
                }

                // if verified, display reset password form
                res.render('reset_password', {
                    title: 'GetTicket | Reset Password',
                    css: 'user_reset_password.css',
                    token: req.params.token,
                    id: decodedToken.id,
                })
            })
        }
    })
}

// Create JWT token for authentication
function createToken(username) {
    const user = { username }
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION // 3days = 3 * 24 * 60 * 60
    })
}
