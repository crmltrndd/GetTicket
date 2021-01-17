const pool = require('../config/database')

// Display Movie Details Page on GET
exports.getMovieDetails = (req, res) => {
    pool.query('SELECT * FROM Movies WHERE Title = ?', [req.params.title], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('movie/details', {
                title: 'GetTicket | Movie',
                css: 'user_movie_details.css',
                movie: results[0]
            })
        }
    })
}