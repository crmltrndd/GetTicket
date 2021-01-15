// Display Home / Index Page on GET
exports.getHome = (req, res) => {
    res.render('index', {
        title: 'GetTicket',
        css: 'user_login.css',
    })
}