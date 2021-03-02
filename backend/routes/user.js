const express = require('express'); // pour importer express
const router = express.Router(); // pour créér notre router avec la fonction router de express
const userCtrl = require('../controllers/user'); // pour importer les controleurs

router.post('/signup', userCtrl.signup); // pour importer la fonction avec ('URI', nomDuController.nomDeLaRoute)
router.post('/login', userCtrl.login);

module.exports = router; // pour exporter le router vers app.js