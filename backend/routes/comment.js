const express = require('express'); // pour importer application Express
const router = express.Router(); // pour créer un routeur Express
const auth = require('../middleware/auth'); // pour importer le middleware auth
//const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const commentCtrl = require('../controllers/comment'); // pour importer le controleur

//pour enregistrer des commentaires dans la BDD
router.post('/',auth, commentCtrl.createComment);

//pour afficher un commentaire
//router.get('/:id', auth, commentCtrl.getOneComment);

//pour modifier un commentaire  
//router.put('/:id', auth, commentCtrl.modifyComment);

//pour liker un commentaire
//router.post('/:id/like', auth, commentCtrl.likeComment);

//pour supprimer un commentaire 
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;