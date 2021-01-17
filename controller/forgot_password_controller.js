const transporter = require('../config/mailer')
const pool = require('../config/database')
const jwt = require('jsonwebtoken')

// Display forget password form on GET
exports.getForgotPassword = (req, res) => {
    res.render('forgot_password', {
        title: 'GetTicket | Forgot Password',
        css: 'user_contact_us.css',
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
                html: 
                `<h3>Forgot your password?</h3>
                <p>We're sending you this because we've received a request to reset your password. If you didn't make this request, just ignore this email. Otherwise, you can change your password using this link:</p>
                <p><a href="http://localhost:5000/reset_password/${payload.id}/${token}">RESET PASSWORD</a></p>
                <div>Cheers,</div>
                <div><b>Your GetTicket team</b></div>`
            } 
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.error(error)
                }
                req.flash('info', 'An email is already been sent to your account. Please check it for reset password process.')
                res.redirect('/forgot_password')
            })
        } else {
            req.flash('error', 'No account match our record.')
            res.redirect('/forgot_password')
        }
    })
}