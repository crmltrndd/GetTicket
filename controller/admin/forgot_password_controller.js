const transporter = require('../../config/mailer')
const pool = require('../../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Display forget password form on GET
exports.getForgotPassword = (req, res) => {
    res.render('admin/forgot_password', {
        title: 'GetTicket Admin | Forgot Password',
        css: 'admin_forgot_password.css'
    })
}


//--- Forgot Password Process ---//
// Handle forgot password on POST.
exports.postForgotPassword = (req, res) => {
    const email = req.body.email
    pool.query('SELECT * FROM Admin_Profile WHERE Email = ?', [email], (error, results) => {
        if (error) {
            return console.error(error)
        }
        if (results.length == 1) {
            const otp = parseInt(Math.random() * 1000000)

            // Create one-time-use token secret key
            const secret = results[0].Password + "-" + process.env.ADMIN_TOKEN_SECRET

            // Create token and cookie with expiration after 5 minutes
            const resetToken = jwt.sign({ otp: otp, id: results[0].ID }, secret, { expiresIn: process.env.RESET_TOKEN_EXPIRATION })
            const expiryDate = new Date(Date.now() + process.env.RESET_COOKIE_EXPIRATION * 60 * 1000)  // 5 minutes in milliseconds
            res.cookie('reset', resetToken, { httpOnly: true, expires: expiryDate })

            // Send verification code to email (with defined transport object)
            const mailOptions = {
                to: email,
                subject: "GetTicket Verification Code",
                html: "<p> Your One Time Pin for account recovery is </p>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.error(error)
                }
                req.flash('info', 'A verification code has been sent to your email account.')
                res.render('admin/forgot_password/verify_code', {
                    title: 'GetTicket Admin | Forgot Password',
                    css: 'admin_forgot_password.css',
                    email: email
                })
            })
        } else {
            req.flash('error', 'User does not exist')
            res.redirect('/admin/forgot_password')
        }
    })
}


//--- Forgot Password > Verify Code Process ---// 
// Handle verify code on POST 
exports.postVerifyCode = (req, res) => {
    // Select user from database to verify token
    pool.query('SELECT * FROM Admin_Profile WHERE Email = ?', [req.body.email], (err, results) => {
        if (err) {
            return console.error(err)
        }
        // Get one-time-use token secret key
        const secret = results[0].Password + "-" + process.env.ADMIN_TOKEN_SECRET
        jwt.verify(req.cookies.reset, secret, (error, decodedToken) => {
            if (error) {
                console.error(error)
                req.flash('error', 'Your session has expired.')
                res.redirect('/admin/forgot_password')
            } else {
                // check if verification code is valid
                if (decodedToken.otp == req.body.code && decodedToken.id == results[0].ID) {
                    res.render('admin/forgot_password/reset_password', {
                        title: 'GetTicket Admin | Forgot Password',
                        css: 'admin_forgot_password.css',
                        email: req.body.email,
                    })
                } else {
                    req.flash('error', 'Invalid Verification Code')
                    res.status(401).render('admin/forgot_password/verify_code', {
                        title: 'GetTicket Admin | Forgot Password',
                        css: 'admin_forgot_password.css',
                        email: req.body.email
                    })
                }
            }
        })
    })
}


//--- Forgot Password >  Reset Password Process ---//
// Handle reset password on POST 
exports.postResetPassword =  (req, res) => {
        pool.query('SELECT * FROM Admin_Profile WHERE Email = ?', [req.body.email], (err, result) => {
            if (err) {
                return console.error(err)
            }
            // Get one-time-use token secret key
            const secret = result[0].Password + "-" + process.env.ADMIN_TOKEN_SECRET
            jwt.verify(req.cookies.reset, secret, async (error, decodedToken) => {
                if (error) {
                    console.error(error)
                    req.flash('error', 'Your session has expired.')
                    res.redirect('/admin/forgot_password')
                } else {
                    const password = await bcrypt.hash(req.body.password, 10)
                    pool.query('UPDATE Admin_Profile SET Password = ? WHERE Email = ?', [password, req.body.email], (error, results) => {
                        if (error) {
                            return console.error(error)
                        }
                        req.flash('success', 'Reset password successful.')
                        res.cookie('reset', '', { maxAge: 1 })
                        res.status(200).redirect('/admin/login')
                    })
                }
            })
        })


}