const task = require('../models/task');
const list = require('../models/list');

const { validationResult } = require('express-validator');

exports.getAllTaskData = async(req,res) => {
    try {
        const tasks = await task.findAll();
        return tasks;
    } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.getAllTaskListData = async(req,res) => {
    try {
        const lists = await list.findAll();
        return lists;
    } catch (error) {
        console.error("Erreur lors de la récupération des listes :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.showAll = async(req,res) => {
    try {
        const tasks = await task.findAll();
        //res.status(200).send("Liste!");
        res.render('task/all.ejs', {
            'tasks': tasks,
            'pageTitle': 'Toutes les tâches',
            'path': '/task/all',
            'allSS': true,
            successMessage: req.flash('success'),
            errorMessage: req.flash('error')
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage de la tâche :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.show = async (req,res) => {
    try {
        const id = req.params.id;
        const singleTask = await task.findById(id);
        //res.status(200).send("Liste!");

        res.render('task/show.ejs', {
            'singleTask': singleTask,
            'pageTitle': 'Tâche numéro ' + id,
            'path': '/task/show',
            'singleCSS': true
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage de la liste :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.getCreate = (req, res, next) => {
        this.getAllTaskListData().then(tasksLists => { // Attend que la promesse soit résolue
            res.render('task/create.ejs', {
                'tasksLists': tasksLists,
                pageTitle: 'Ajout d\'une tâche',
                path: '/admin/add-product',
                editing: false,
                'listCSS': true,
                'userId': req.session.user.id
            });
        })
    .catch(err => console.log(err));
};

exports.create = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Stocker les erreurs dans des flash messages
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/task');
    }

    const title = req.body.title;
    let isCompleted = null;

    if(req.body.isCompleted === "0")
        isCompleted = false;

    if(req.body.isCompleted === "1")
        isCompleted = true;

    const taskListId = parseInt(req.body.taskListId);
    const userId = parseInt(req.body.userId);

    try {
        const tasks = await task.create({title: title, isCompleted: isCompleted, taskListId: taskListId, userId: userId});
        //res.status(200).send("Liste!");
        req.flash('success', 'Tâche créée avec succès ! ');

        res.redirect('/task');

    } catch (error) {
        console.error("Erreur lors de la création de la tâche :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.getUpdate = async (req, res) => {
    const id = parseInt(req.params.id);
    const singleTask = await task.findById(id);

    let taskList = this.getAllTaskListData().then(tl => {
        taskList = tl;
    });

    this.getAllTaskData().then(task => { // Attend que la promesse soit résolue
        res.render('task/update.ejs', {
            'task': singleTask,
            'taskList': taskList,
            pageTitle: 'Modification d\'une tâche',
            path: '/admin/add-product',
            editing: false,
            'updateCSS': true,
            'userId': req.session.user.id
        });
    })
        .catch(err => console.log(err));
};

exports.update = async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Stocker les erreurs dans des flash messages
        req.flash('error', errors.array().map(err => err.msg));
        return res.redirect('/task');
    }

    const id = parseInt(req.body.id);

    const title = req.body.title;
    let isCompleted = null;

    if(req.body.isCompleted === "0")
        isCompleted = false;

    if(req.body.isCompleted === "1")
        isCompleted = true;

    const taskListId = parseInt(req.body.taskListId);

    try {
        const tasks = await task.update(id,{title: title, isCompleted: isCompleted, taskListId: taskListId});
        req.flash('success', 'Tâche modifiée avec succès ! ');
        res.redirect('/task');
        //res.status(200).send("Tâche!");
    } catch (error) {
        console.error("Erreur lors de la modification de la tâche :", error);
        //res.status(500).send("Erreur serveur");
    }
};

exports.delete = async (req,res) => {
    const id = parseInt(req.body.id);

    try {
        const tasks = await task.delete(id);
        req.flash('success', 'Tâche supprimée avec succès ! ');
        res.redirect('/task');
        //res.status(200).send("Tâche!");
    } catch (error) {
        console.error("Erreur lors de la suppression de la tâche :", error);
        //res.status(500).send("Erreur serveur");
    }
};