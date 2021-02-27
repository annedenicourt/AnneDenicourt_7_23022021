const express = require('express'); // pour importer application Express
const bodyParser = require('body-parser'); // pour importer le package body parser
//const sauceRoutes = require('./routes/sauce'); // pour importer notre router sauce
const userRoutes = require('./routes/user'); // pour importer notre router user
const path = require('path'); // pour donner accès au chemin de notre système de fichiers
require('dotenv').config();

const app = express();
const cors = require('cors')

app.use(cors())


app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS

app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/sauces', sauceRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/auth', userRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/auth
module.exports = app;