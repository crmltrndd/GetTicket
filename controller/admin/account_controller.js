const pool = require('../../config/database')

// Display Account Page on GET
exports.getAccount = (req, res) => {
    pool.query('SELECT * FROM Admin_Profile WHERE ID = ?', [req.user.id], async (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/account', {
                title: 'GetTicket Admin Portal | Account',
                css: 'admin_home.css',
                username: req.user.username,
                role: req.user.role,
                phone: results[0].Phone,
                email: results[0].Email
            })
        }
    })
}