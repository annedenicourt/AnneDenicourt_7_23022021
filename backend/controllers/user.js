const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const fs = require('fs');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create ({
            email: req.body.email,
            name: req.body.name,
            job: req.body.job,
            password: hash
        })
        .then(user => {
            res.status(201).json({
                userId: user.id,
                role: user.role,
                userName: user.name,
                token: jwt.sign(
                    { 
                        userId: user.id,
                        role: user.role,
                        userName: user.name
                    },
                    process.env.JWT_RAND_SECRET,
                    { expiresIn: '24h' }
                )
            })
       })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })) 
};

exports.login = (req, res, next) => {
    db.User.findOne({where: { email: req.body.email } }) // on vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // on utilise la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        token: jwt.sign( // on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token
                            {
                                userId: user.id,
                                role: user.role,
                                userName: user.name
                            },
                            process.env.JWT_RAND_SECRET, // on utilise une chaîne secrète de développement temporaire
                            {expiresIn: '24h'} // pour définir la durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
        order: [
            ['name', 'ASC']
      ],
    })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error }))
}

exports.getCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    console.log(userId)

    db.User.findOne({ where: { id: userId } })
        .then(user => {
            res.status(200).json({
                UserId: user.id,
                UserName: user.name,
                UserRole: user.role,
                job: user.job,
                image: user.image,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: 'erreur bdd' }))
}

exports.getOneUser = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            res.status(200).json({
                UserId: user.id,
                UserName: user.name,
                UserRole: user.role,
                job: user.job,
                image: user.image,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: 'erreur bdd' }))
}

exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
        .then(user => {
            if(user.image) {
                const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
                console.log(user.image)
                fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                    user.update({
                        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
                    })
                    .then(() => res.status(200).json({ message: 'Utilisateur modifié'}))
                    .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour' }));
                });
            }
            user.update({
                image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
            })
            .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour' }));
        })
        .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé' }))
  };

exports.deletePictureUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
      .then(user => {
        const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
        fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
            user.update({
                image:null
             })
            .then(() => res.status(200).json({ message: 'Photo supprimée'}))
            .catch(error => res.status(400).json({ error: 'Pb suppression photo' }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.deleteCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
      .then(user => {
        if(user.image) {
            const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
            console.log(user.image)
            fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                user.destroy({ where: { id: userId } })
                .then(() => res.status(200).json({ message: 'Compte supprimé'}))
                .catch(error => res.status(400).json({ error: 'Pb suppression compte' }));
            });
        }
       user.destroy({ where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Compte supprimé'}))
        .catch(error => res.status(400).json({ error: 'Pb suppression compte' }));
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));
};