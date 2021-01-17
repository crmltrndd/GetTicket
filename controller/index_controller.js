const pool = require('../config/database')

// Display Home / Index Page on GET
exports.getHome = (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('index', {
                title: 'GetTicket',
                css: 'user_home.css',
                movies: results
            })
        }
    })
}

// Logout User on GET
exports.getLogout = (req, res) => {
    res.cookie('access', '', {maxAge: 1} )
    res.redirect('/')
}