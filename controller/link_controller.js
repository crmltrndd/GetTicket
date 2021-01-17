// Display Customer Service Page on GET
exports.getCustomerService = (req, res) => {
    res.render('link/customer_service', {
        title: 'GetTicket | Customer Service',
        css: 'user_link.css',
    })
}


// Display Disclaimer Page on GET
exports.getDisclaimer = (req, res) => {
    res.render('link/disclaimer', {
        title: 'GetTicket | Disclaimer',
        css: 'user_link.css',
    })
}


// Display Mall Page on GET
exports.getMall = (req, res) => {
    res.render('link/time_square_mall', {
        title: 'GetTicket | Time Square Mall',
        css: 'user_link.css',
    })
}


// Display Privacy Policy Page on GET
exports.getPrivacyPolicy = (req, res) => {
    res.render('link/privacy_policy', {
        title: 'GetTicket | Privacy Policy',
        css: 'user_link.css',
    })
}


// Display Terms Page on GET
exports.getTerms = (req, res) => {
    res.render('link/terms', {
        title: 'GetTicket | Terms',
        css: 'user_link.css',
    })
}