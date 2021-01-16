const pool = require('../config/database')

// Display Home / Index Page on GET
exports.getHome = (req, res) => {
    pool.query('SELECT * FROM Movies', (error, results) => {
        if (error) {
            console.error(error)
        } else {
            console.log(results)
            res.render('index', {
                title: 'GetTicket',
                css: 'user_home.css',
                movies: results
            })
        }
    })
}