const express = require('express') //On importe express
const router = express.Router() //On créé un routeur Express
const auth = require('../middleware/auth') 
// const multer = require('../middleware/multer-config') 
const profilCtrl = require('../controllers/profil') 

router.get('/:userId', auth, profilCtrl.userProfil) 
router.put('/:userId', auth, profilCtrl.updateProfil) 
router.delete('/:userId', auth, profilCtrl.deleteProfil) 



module.exports = router 