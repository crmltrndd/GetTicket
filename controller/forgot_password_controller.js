const transporter = require('../config/mailer')
const pool = require('../config/database')
const jwt = require('jsonwebtoken')

// Display forget password form on GET
exports.getForgotPassword = (req, res) => {
    res.render('forgot_password', {
        title: 'GetTicket | Forgot Password',
        css: '',
    })
}


// Handle forgot password on POST.
exports.postForgotPassword = (req, res) => {
    const email = req.body.email
    pool.query('SELECT * FROM User_Profile WHERE Email = ?', [email], (error, results) => {
        if (error) {
            return console.error(error)
        }
        if (results.length == 1) {
            // Create one-time-use token secret key & payload
            const secret = results[0].Password + "-" + process.env.RESET_PASSWORD_TOKEN_SECRET
            const payload = {id: results[0].User_ID}

            // Create token
            const token = jwt.sign(payload, secret, {expiresIn: '5m'})
            
            // Send verification code to email (with defined transport object)
            const mailOptions = {
                to: email,
                subject: "GetTicket Account Recovery",
                html: `<p> Click this <a href="http://localhost:5000/reset_password/${payload.id}/${token}">link</a> to reset your password.</p>`
            } 
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.error(error)
                }
                req.flash('info', 'An email is already been sent to your account. Please check it for reset password process.')
                res.redirect('/forgot_password')
            })
        } else {
            req.flash('info', 'An email is already been sent to your account. Please check it for reset password process.')
            res.redirect('/forgot_password')
        }
    })
}