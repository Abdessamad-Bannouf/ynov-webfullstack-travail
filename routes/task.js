const express = require('express');

const taskController = require("../controllers/task");

const router = express.Router();

router.get('/add', taskController.getCreate);
router.post('/add', taskController.create);

router.get('/update/:id', taskController.getUpdate);
router.post('/update/:id', taskController.update);

router.post('/delete', taskController.delete);

router.get('/:id', taskController.show);
router.get('/', taskController.showAll);

module.exports = router;