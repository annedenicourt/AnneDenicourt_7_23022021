const express = require('express'); // pour importer application Express
const router = express.Router(); // pour créer un routeur Express
const auth = require('../middleware/auth'); // pour importer le middleware auth
const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const postCtrl = require('../controllers/post'); // pour importer le controleur

//pour enregistrer des posts dans la BDD
router.post('/', auth, multer, postCtrl.createPost);
//pour liker un post
router.post('/like', auth, postCtrl.likePost)
//pour afficher tous les posts
router.get('/', postCtrl.getAllPosts);
//pour afficher tous les comments
router.get('/:id/comments', postCtrl.getAllComments);
//pour afficher tous les posts d'un user
router.get('/users/:id', auth, postCtrl.getAllPostsByUser);
//pour récupérer tous les likes
router.get('/:id/likes', postCtrl.getAllLikePost)
//pour supprimer un post 
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;