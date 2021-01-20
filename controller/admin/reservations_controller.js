const pool = require('../../config/database')

// Display Cinema Page on GET
exports.getReservations = (req, res) => {
    pool.query('SELECT * FROM Reservations', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/reservations', {
                title: 'GetTicket Admin | Reservations',
                css: 'admin_home.css',
                username: req.user.username,
                role: req.user.role,
                reservations: results,
            })
        }
    })
}