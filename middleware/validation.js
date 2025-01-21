const { body } = require('express-validator');

const validation = {
    auth: [
        body('email').
            isEmail().
            withMessage('Un email valide (abc@abc.com) est requis.')
            .notEmpty()
            .withMessage('Un email valide doit être rempli.'),
        body('password')
            .isLength({min: 4})
            .withMessage('Le mot de passe doit contenir au moins 4 caractères.'),
        body('confirmPassword')
            .isLength({min: 4})
            .withMessage('Le mot de passe doit contenir au moins 4 caractères.'),
    ],


// Task
    task: [
        body('title')
            .isLength({min: 4})
            .withMessage('La titre doit contenir au moins 4 caractères.'),
        body('isCompleted')
            .notEmpty()
            .withMessage('Le champ est "complété" est requis .'),
        body('taskListId')
            .notEmpty()
            .withMessage('La liste de tâches doit être requis.'),
    ],



// Task list
    list: [
        body('name')
            .isLength({min: 5})
            .withMessage('La liste de tâches doit contenir au moins 5 caractères.'),
    ],
};

const getValidationRules = (model) => {
    return validation[model] || [];
};

module.exports = getValidationRules;