
// Display Contact Us Page on GET
exports.getContactUs = (req, res) => {
    res.render('contact_us', {
        title: 'GetTicket | Contact Us',
        css: 'user_contact_us.css',
    })
}