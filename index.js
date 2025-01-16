const listRoutes = require('./routes/list');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const homeRoutes = require('./routes/home');

const errorController = require('./controllers/error');
const bodyParser = require('body-parser');
const path = require("path");
const prisma = require('./util/prisma');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store'); // Import corrigé
const session = require('express-session'); // Assure-toi de l'importer
const csrf = require('csurf');
const WebSocket = require('ws');

const express = require('express');
const app = express();
const port = 3000;

const server = require('http').createServer(app);
//const wss = new WebSocket.Server({server: server});

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

const csrfProtection = csrf();

app.use(csrfProtection);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    prisma.user.findUnique({ where: { id: parseInt(req.session.user.id) } })
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});


app.use( (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/task', taskRoutes);
app.use('/list', listRoutes);
app.use('/chat', chatRoutes);
app.use(authRoutes);
app.use('/', homeRoutes)
app.use(errorController.get404);


app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    console.log(req.session.user);
    res.send('Hello World!');
});

let test = app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
const wss = new WebSocket.Server({server: test});

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Message received:', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

wss.on('connection', (ws) => {
    console.log('A new client connected !');
    //ws.send('Welcome new client !');
    ws.on('message', async (data) => {
        //console.log('received %s', message);
        const { sender, content } = JSON.parse(data);
        // Enregistrer le message dans la base de données
        const newMessage = await prisma.message.create({
            data: { sender, content },
        });

        wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify(newMessage));
            }
        });
        //ws.send('Got ur msg its:' + message);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
