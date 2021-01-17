
// Display MyAccount - Profile Page on GET
exports.getCart = (req, res) => {
    res.render('cart', {
        title: 'GetTicket | Cart',
        css: 'user_cart.css',
    })
}