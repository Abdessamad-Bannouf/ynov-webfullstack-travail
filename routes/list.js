const express = require('express');

const listController = require('../controllers/list');

const router = express.Router();

router.get('/add', listController.getCreate);
router.post('/add', listController.create);

router.get('/update/:id', listController.getUpdate);
router.post('/update/:id', listController.update);

router.post('/delete', listController.delete);

router.get('/:id', listController.show);
router.get('/', listController.showAll);

module.exports = router;