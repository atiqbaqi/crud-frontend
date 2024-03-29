const express = require('express');
const app = express();
require('dotenv').config();
const route = require('./routes/route');
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

const app_port=process.env.APP_PORT || 8081;
// Tell Express to use EJS as the template engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(route);

app.get('/', async (req, res) => {
    return res.render('index');
});

app.listen(app_port,()=>{
    console.log(`listening on ${app_port}`);
});