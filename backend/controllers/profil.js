const db = require('../models');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userProfil = (req, res, next) => { 
    const userId = req.params.userId

    db.User.findOne({ 
         attributes: ['id', 'name', 'email', 'job'], 
         where: { id: userId } 
    })
         .then(user => {
              if (!user) { 
                   return res.status(404).json({ error: 'Utilisateur introuvable' })
              }
              res.status(200).json({ user }) 
         })
         .catch(error => { res.status(404).json({ error: 'Utilisateur non trouvé !' }) }) 
}

