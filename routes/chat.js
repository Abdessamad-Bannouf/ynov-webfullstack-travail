const express = require('express');

const chatController = require('../controllers/chat');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/messages', chatController.getMessages);
router.get('/', chatController.getChat);

module.exports = router;