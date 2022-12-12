require('./models/db');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require('body-parser');

const contactController = require('./controllers/contactController')

var app = express();

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

/*
app.get('/', (req, res) => {
    res.send(`
        <h1>Hello world</h1>
    `)
})
*/

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs',
    exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
})
);

app.set("view engine", "hbs");

app.listen(3000, () => {
    console.log("Connected");
});

app.use("/", contactController);