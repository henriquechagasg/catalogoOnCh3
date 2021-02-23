module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){
        // req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    }
    next(); 
}
