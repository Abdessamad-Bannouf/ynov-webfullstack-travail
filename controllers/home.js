exports.index = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Page d\'accueil',
        path: '/home',
        successMessage: req.flash('success'),
        errorMessage: req.flash('error')
    });
};
