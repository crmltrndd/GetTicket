const pool = require('../config/database')

// Display Cart Page on GET
exports.getCart = (req, res) => {
    pool.query('SELECT * FROM Transaction_History WHERE Transaction_User = ?', [res.locals.user.Username], (error, results) => {
        if (error) {
            console.error(error)
        } else {
            res.render('cart', {
                title: 'GetTicket | Cart',
                css: 'user_cart.css',
                transactions: results
            })
        }
    })
}