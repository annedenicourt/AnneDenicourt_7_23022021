const express = require('express'); // pour importer application Express
const router = express.Router(); // pour créer un routeur Express
//const auth = require('../middleware/auth'); // pour importer le middleware auth
const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const postCtrl = require('../controllers/post'); // pour importer le controleur

//pour afficher tous les posts
router.get('/', postCtrl.getAllPosts);
//pour enregistrer des posts dans la BDD
router.post('/', multer, postCtrl.createPost);
//pour afficher un post
//router.get('/:id', auth, postCtrl.getOnePost);
//pour modifier un post  
//router.put('/:id', auth, multer, postCtrl.modifyPost);
//pour liker un post
//router.post('/:id/like', auth, postCtrl.likePost)
//pour supprimer un post 
//router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;