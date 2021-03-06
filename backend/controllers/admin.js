const db = require('../models');
const fs = require('fs');

exports.modifyUserRole = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            user.update({
                role: req.body.role
            })
            .then(() => res.status(200).json({ message: 'Rôle modifié' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour' }));
        })
        .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé' }))
};

exports.getNewUsersAdmin = (req, res, next) => {
    db.User.findAll({
        limit:3,
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(newUsers => res.status(200).json(newUsers))
        .catch(error => res.status(500).json({ error }))
}

exports.getNewPostsAdmin = (req, res, next) => {
    db.Post.findAll({
        include: {
            model: db.User,
            attributes: ["id", "name", "role", "image"]
        },
        limit:4,
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(newPosts => res.status(200).json(newPosts))
        .catch(error => res.status(500).json({ error }))
}

exports.getAllCommentsAdmin = (req, res, next) => {
    db.Comment.findAll({
        include: {
            model: db.User,
            attributes: ["id", "name", "role", "image"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    }) 
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
}

exports.deleteUserAdmin = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id } })
      .then(user => {
        if(user.image) {
            const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
            //console.log(user.image)
            fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                user.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Compte supprimé'}))
                .catch(error => res.status(400).json({ error: 'Pb suppression compte' }));
            });
        }
       user.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Compte supprimé'}))
        .catch(error => res.status(400).json({ error: 'Pb suppression compte' }));
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));
};