const list = require('../models/list');

const { validationResult } = require('express-validator');

exports.showAll = async (req,res) => {

    try {
        const lists = await list.findAll();
        //res.status(200).send("Liste!");

        res.render('list/all.ejs', {
            'lists': lists,
            'pageTitle': 'Toutes les listes',
            'path': '/list',
            'listCSS': true,
            successMessage: req.flash('success'),
            errorMessage: req.flash('error')
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.show = async (req,res) => {
    const id = req.params.id;

    try {
        const singleList = await list.findById(id);
        //res.status(200).send("Liste!");

        res.render('list/show.ejs', {
            'singleList': singleList,
            'pageTitle': 'Liste numéro ' + id,
            'path': '/list/show',
            'addCSS': true
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.getCreate = (req, res, next) => {
    res.render('list/create.ejs', {
        'pageTitle': 'Ajout d\'une liste',
        'path': '/list/create',
        'editing': false,
        'addCSS': true,
        'userId': req.session.user.id
    });
};

exports.create = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Stocker les erreurs dans des flash messages
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/list');
    }

    const name = req.body.name;
    const userId = parseInt(req.body.userId);

    try {
        // TODO: Enlever la ligne d'en dessous lorsqu'on mettre en place l'authentication
        const lists = await list.create({name: name, userId: userId});
        //res.status(201).send("Liste créée avec succès !");
        req.flash('success', 'Liste créée avec succès ! ');

        res.redirect('/list');

    } catch (error) {
        console.error("Erreur lors de la création de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.getUpdate = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        // TODO: Enlever la ligne d'en dessous lorsqu'on mettre en place l'authentication
        const singleList = await list.findById(id);
        //res.status(201).send("Liste créée avec succès !");
        res.render('list/update.ejs', {
            'list': singleList,
            pageTitle: 'Modification d\'une liste',
            path: '/admin/add-product',
            editing: false,
            'updateCSS': true,
            'userId': req.session.user.id
        });

    } catch (error) {
        console.error("Erreur lors de la création de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.update = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Stocker les erreurs dans des flash messages
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/task');
    }

    const id = parseInt(req.body.id);
    const name = req.body.name;
    const userId = parseInt(req.body.userid);

    try {
        const singleList = await list.update(id, {name: name, userId: userId});
        //res.status(201).send("Liste modifiée avec succès !");
        req.flash('success', 'Liste modifiée avec succès ! ');
        res.redirect('/list');
    } catch (error) {
        console.error("Erreur lors de la modification de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.delete = async (req,res) => {
    const id = parseInt(req.body.id);

    try {
        const lists = await list.delete(id);
        //res.status(200).send("Liste supprimé avec succès !");
        req.flash('success', 'Liste supprimée avec succès ! ');
        res.redirect('/list');
    } catch (error) {
        console.error("Erreur lors de la suppression de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};
