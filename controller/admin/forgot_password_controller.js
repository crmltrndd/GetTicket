const transporter = require('../../config/mailer')
const pool = require('../../config/database')
const bcrypt = require('bcryptjs')


// Display forget password form on GET
exports.getForgotPassword = (req, res) => {
    res.render('admin/forgot_password', {
        title: 'GetTicket Admin Portal | Forgot Password',
        css: 'admin_forgot_password.css'
    })
}

//--- Forgot Password Process ---//
// Handle forgot password on POST.
exports.postForgotPassword = (req, res) => {
    const otp = parseInt(Math.random() * 1000000)
    const email = req.body.email
    pool.query('SELECT * FROM Admin_Profile WHERE Email = ?', [email], (error, results) => {
        if (error) {
            return console.error(error)
        }
        if (results.length == 1) {
            // Send verification code to email (with defined transport object)
            const mailOptions = {
                to: email,
                subject: "GetTicket Verification Code",
                html: "<h3> OTP for account recovery is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.error(error)
                }
                req.flash('info', 'A verification code has been sent your email account')
                res.render('admin/forgot_password/verify_code', {
                    title: 'GetTicket Admin Portal | Forgot Password',
                    css: 'admin_forgot_password.css',
                    email: email,
                    resetting: true
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
    if (otp == req.body.code) {
        res.render('admin/forgot_password/reset_password', {
            title: 'GetTicket Admin Portal | Forgot Password',
            css: 'admin_forgot_password.css',
            email: req.body.email,
            resetting: req.body.resetting
        })
    } else {
        req.flash('error', 'Invalid Verification Code')
        res.status(401).render('admin/forgot_password/verify_code', {
            title: 'GetTicket Admin Portal | Forgot Password',
            css: 'admin_forgot_password.css',
            email: req.body.email,
            resetting: req.body.resetting
        })
    }
}

//--- Forgot Password >  Reset Password Process ---//
// Handle reset password on POST 
exports.postResetPassword = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        pool.query('UPDATE Admin_Profile SET Password = ? WHERE Email = ?', [password, req.body.email], (error, results) => {
            if (error) {
                console.error(error)
            }
            req.body.resetting = false
            req.flash('success', 'Reset password successful.')
            res.status(200).redirect('/admin/login')
        })
    } catch (error) {
        console.error(error)
    }
}