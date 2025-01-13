const express = require('express');

const taskController = require("../controllers/task");

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add', isAuth, taskController.getCreate);
router.post('/add', isAuth, taskController.create);

router.get('/update/:id', isAuth, taskController.getUpdate);
router.post('/update/:id', isAuth, taskController.update);

router.post('/delete', isAuth, taskController.delete);

router.get('/:id', isAuth, taskController.show);
router.get('/', isAuth, taskController.showAll);

module.exports = router;