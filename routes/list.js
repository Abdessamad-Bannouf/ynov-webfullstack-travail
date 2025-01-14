const express = require('express');

const listController = require('../controllers/list');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add',isAuth, listController.getCreate);
router.post('/add',isAuth, listController.create);

router.get('/update/:id', isAuth, listController.getUpdate);
router.post('/update/:id', isAuth, listController.update);

router.post('/delete', isAuth, listController.delete);

router.get('/:id', isAuth, listController.show);
router.get('/', isAuth, listController.showAll);

module.exports = router;