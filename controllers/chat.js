const chat = require('../models/chat');


exports.getMessages = async (req, res) => {
    try {
        const messages = await chat.findAll({
            orderBy: { createdAt: 'asc' },
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.getChat = async (req, res) => {
    try {
        const messages = await chat.findAll({
            orderBy: { createdAt: 'asc' },
        });

        //res.status(200).send("Liste!");
        res.render('chat/home.ejs', {
            'messages': messages,
            'pageTitle': 'Tous les messages',
            'path': '/message/home',
            'allSS': true
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
        //res.status(500).send("Erreur serveur");
    }
};