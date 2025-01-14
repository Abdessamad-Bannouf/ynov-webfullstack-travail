const User = require('../models/user');
const user = require('../models/user');
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/auth',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
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
                            res.redirect('/');
                        });
                    }
                    // Mauvais mot de passe
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
};


exports.postSignup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const date = new Date;
    const isConfirmPassword = password === confirmPassword;

    user.findByEmail(email).then(userMail => {
        if(isConfirmPassword === true) {
            if (userMail) {
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12).then(hashedPassword => {
                console.log(hashedPassword);
                user.create({email: email, password: hashedPassword, createdAt: date, role: 'user'});

            }).then(exist => {
                return res.redirect('/login');
            });
        } else {
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
