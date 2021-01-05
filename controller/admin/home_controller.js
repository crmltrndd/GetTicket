const pool = require('../../config/database')
const bcrypt = require('bcryptjs')


// Display Home Page
exports.getHome = (req, res) => {
    res.render('admin/home', {
        title: 'GetTicket Admin Portal',
        css: '/admin_home.css',
        username: req.user.username,
        role: req.user.role,
    })
}


// Handle reset password on POST
exports.postHomeResetPassword = (req, res) => {
    pool.query('SELECT Password FROM Admin_Profile WHERE ID = ?', [req.user.id], async (error, results) => {
        if (error) {
            console.error(error)
        } else {
            try {
                const password = await bcrypt.hash(req.body.new, 10)
                if (await bcrypt.compare(req.body.current, results[0].Password)) {
                    pool.query('UPDATE Admin_Profile SET Password = ? WHERE ID = ?', [password, req.user.id], (error, results) => {
                        if (error) {
                            console.log(error)
                        }
                        req.flash('success', 'You\'ve successfully reset your password.')
                        res.status(200).redirect('/admin/home')
                    })
                } else {
                    req.flash('error', 'Reset password failed! Invalid current password.')
                    res.status(400).redirect('/admin/home')
                }
            } catch (error) {
                console.error(error)
            }
        }
    })
}
