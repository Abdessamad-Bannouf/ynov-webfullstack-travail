const User = require('../models/user');
const user = require('../models/user');
const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator");

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/auth',
        pageTitle: 'Login',
        isAuthenticated: false,
        successMessage: req.flash('success'),
        errorMessage: req.flash('error')
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false,
        successMessage: req.flash('success'),
        errorMessage: req.flash('error')
    });
};

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Stocker les erreurs dans des flash messages
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/login');
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email)
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            if (err) {
                                console.log(err);
                            }
                            req.flash('success', 'Connexion  réussie ! ');
                            res.redirect('/');
                        });
                    }
                    // Mauvais mot de passe
                    req.flash('error', 'Mauvais mot de passe ! ');
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Le mail n\'existe pas ! ');
            res.redirect('/login');
        });
};


exports.postSignup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Stocker les erreurs dans des flash messages
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/signup');
    }

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const date = new Date;
    const isConfirmPassword = password === confirmPassword;

    user.findByEmail(email).then(userMail => {
        if(isConfirmPassword === true) {
            if (userMail) {
                req.flash('error', 'Le mail existe déjà ! ');
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12).then(hashedPassword => {
                console.log(hashedPassword);
                user.create({email: email, password: hashedPassword, createdAt: date, role: 'user'});
                req.flash('success', 'Inscription réussie ! ');
            }).then(exist => {
                return res.redirect('/login');
            });
        } else {
            req.flash('error', 'Le mot de passe doit être identique ! ');
            return res.redirect('/signup');
        }
    }).catch(err => {
        console.log(err);
    });
    /*try {
        const getUserEmail = await user.findByEmail(email);
        if(!getUserEmail) {
            console.log("toto");
            return res.redirect('/signup')
        }

    } catch (error) {
        console.error("Erreur lors de la récupération du mail :", error);
        //res.status(500).send("Erreur serveur");
    }*/
};

exports.postLogout = (req, res, next) => {
    console.log("a");
    req.session.destroy(err => {
        console.log("b");
        console.log(err);
        res.redirect('/');
    });
};
