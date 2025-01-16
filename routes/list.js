const express = require('express');

const listController = require('../controllers/list');

const isAuth = require('../middleware/is-auth');

const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get('/add',isAuth, checkRole('admin'), listController.getCreate);
router.post('/add',isAuth, checkRole('admin'), listController.create);

router.get('/update/:id', isAuth, checkRole('admin'), listController.getUpdate);
router.post('/update/:id', isAuth, checkRole('admin'), listController.update);

router.post('/delete', isAuth, checkRole('admin'), listController.delete);

router.get('/:id', isAuth, listController.show);
router.get('/', isAuth, listController.showAll);

module.exports = router;