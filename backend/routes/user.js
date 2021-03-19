const express = require('express'); // pour importer express
const router = express.Router(); // pour créér notre router avec la fonction router de express
const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const auth = require('../middleware/auth'); // pour importer le middleware auth
const userCtrl = require('../controllers/user'); // pour importer les controleurs

router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);

router.get('/users', userCtrl.getAllUsers);
router.get('/users/user/:id', userCtrl.getOneUser);
router.get('/users/monprofil', auth, userCtrl.getCurrentUser);

router.put('/users/monprofil', auth, multer, userCtrl.modifyUser);
router.put('/users/monprofil/mypicture', auth, multer, userCtrl.deletePictureUser);

router.delete('/users/monprofil', userCtrl.deleteCurrentUser);

module.exports = router; // pour exporter le router vers app.js


