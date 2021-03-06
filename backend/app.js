const express = require('express'); // pour importer application Express
const bodyParser = require('body-parser'); // pour importer le package body parser
//const sauceRoutes = require('./routes/sauce'); // pour importer notre router sauce
const userRoutes = require('./routes/user'); // pour importer notre router user
const postRoutes = require('./routes/post'); // pour importer notre router user
const commentRoutes = require('./routes/comment'); // pour importer notre router user
const path = require('path'); // pour donner accès au chemin de notre système de fichiers
require('dotenv').config();

const app = express();
const cors = require('cors')



const db = require("./models");
db.sequelize.sync()
// // drop the table if it already exists
//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//});

app.use(cors())
app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/auth
app.use('/api/posts', postRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/comments', commentRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces
module.exports = app;