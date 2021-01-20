const pool = require('../../config/database')

// Display Cinema Page on GET
exports.getCinema = (req, res) => {
    pool.query('SELECT * FROM Branch', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/cinemas', {
                title: 'GetTicket Admin | Cinemas',
                css: 'admin_home.css',
                username: req.user.username,
                role: req.user.role,
                cinemas: results,
                status: "All",
            })
        }
    })
}

// Display Cinema Page with Active Cinemas on GET
exports.getCinemaActive = (req, res) => {
    pool.query('SELECT * FROM Branch WHERE Status = ?', [1], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/cinemas', {
                title: 'GetTicket Admin | Cinemas',
                css: 'admin_home.css',
                username: req.user.username,
                role: req.user.role,
                cinemas: results,
                status: "Active",
            })
        }
    })
}

// Display Cinema Page with Inactive Cinemas on GET
exports.getCinemaInactive = (req, res) => {
    pool.query('SELECT * FROM Branch WHERE Status = ?', [0], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('admin/cinemas', {
                title: 'GetTicket Admin | Cinemas',
                css: 'admin_home.css',
                username: req.user.username,
                role: req.user.role,
                cinemas: results,
                status: "Inactive",
            })
        }
    })
}