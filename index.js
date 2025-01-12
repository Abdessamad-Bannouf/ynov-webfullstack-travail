const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', 'views');

const listRoutes = require('./routes/list');
const taskRoutes = require('./routes/task');

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json())

app.use('/task', taskRoutes);
app.use('/list', listRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
