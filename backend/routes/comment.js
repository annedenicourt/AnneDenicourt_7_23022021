const express = require('express'); // pour importer application Express
const router = express.Router(); // pour créer un routeur Express
const auth = require('../middleware/auth'); // pour importer le middleware auth
const commentCtrl = require('../controllers/comment'); // pour importer le controleur
const adminCtrl = require('../controllers/admin'); // pour importer le controleur


//pour enregistrer des commentaires dans la BDD
router.post('/',auth, commentCtrl.createComment);

//pour supprimer un commentaire 
router.delete('/:id', auth, commentCtrl.deleteComment);

//pour afficher tous les comments par admin
router.get('/', adminCtrl.getAllCommentsAdmin);

module.exports = router;