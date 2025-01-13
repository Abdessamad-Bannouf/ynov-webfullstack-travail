const listRoutes = require('./routes/list');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const path = require("path");
const prisma = require('./util/prisma');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store'); // Import corrigé
const session = require('express-session'); // Assure-toi de l'importer
//const csrf = require('csurf');

const express = require('express');
const app = express();
const port = 3000;

//const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json());

// Configuration de la session
app.use(
    session({
        secret: 'ton_secret_super_sécurisé', // Remplace par une chaîne sécurisée
        resave: false, // Ne pas enregistrer la session si elle n'a pas changé
        saveUninitialized: false, // Ne pas sauvegarder une session vide
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, // Vérifie les sessions expirées toutes les 2 minutes
            dbRecordIdIsSessionId: true, // Utilise l'ID du modèle Prisma comme ID de session
            dbRecordIdFunction: undefined, // Par défaut, Prisma utilise `cuid`
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // Durée de vie du cookie : 24 heures
            secure: false, // Met à `true` si tu utilises HTTPS
            httpOnly: true, // Bloque l'accès aux cookies côté client
        },
    })
);

//app.use(csrfProtection);

app.use('/task', taskRoutes);
app.use('/list', listRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    console.log(req.session.user);
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});