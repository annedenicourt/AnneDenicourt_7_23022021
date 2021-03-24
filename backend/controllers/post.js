const db = require('../models');
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    
    db.Post.create({
        UserId: userId,
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    })
        .then(post => res.status(201).json({ message: 'Post créé' }))
        
        .catch(error => res.status(400).json({ message: 'erreur création bdd' }))
}

exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    const isliked = req.body.like

    db.Post.findOne({ where: { id: req.body.PostId } })

    .then(post => {
        if (!post) {
            return res.status(404).json({ error: 'Post introuvable !' })
        } else if(isliked === false) {
            db.Like_post.create({ PostId: req.body.PostId, OwnerId: userId })
            .then(like => {
                //res.status(201).json({ message: 'Post liké' })
                post.update({ likes: post.likes + 1 })
                .then(post => res.status(201).json({ message: 'Post liké' }))
                .catch(error => res.status(500).json({ error: ' Erreur update post' })) 
            })
            .catch(error => res.status(400).json({ error }))
        } else if(isliked === true) {
            db.Like_post.destroy({ where: { id: req.body.LikeId, PostId: req.body.PostId, OwnerId: userId } })
            .then(like => {
                post.update({ likes: post.likes - 1 })
                .then(post => res.status(201).json({ message: 'Post disliké' }))
                .catch(error => res.status(500).json({ error: ' Erreur update post' })) 
            })
            .catch(error => res.status(400).json({ message: "problème destroy like" }))
        }
    })
    .catch(error => res.status(400).json({ message: "erreur destroy" }))         
}

exports.deletePost = (req, res, next) => {
    db.Post.findOne({ where: { id: req.params.id } })
      .then(post => {
        if(post.image) {
            const filename = post.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
            console.log(post.image)
            fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Post supprimé'}))
                .catch(error => res.status(400).json({ error: 'Pb suppression post' }));
            });
        }
       post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé'}))
        .catch(error => res.status(400).json({ error: 'Pb suppression post' }));
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));
};

exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    db.Post.findAll({
        include: {
            model: db.User,
            attributes: ["id", "name", "role", "image"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }))
}

exports.getAllPostsByUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    db.Post.findAll({
        where: { UserId: req.params.id},
        include: {
            model: db.User,
            attributes: ["id", "name", "role", "image"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }))
}

exports.getAllLikePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    
    db.Like_post.findAll({
        where: { PostId: req.params.id},
        include: {
            model: db.User,
            attributes: ["name"]
        },
    })
        .then(like_posts => res.status(200).json(like_posts))
        .catch(error => res.status(500).json({ error }))
}

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        where: { PostId: req.params.id},
        include: {
            model: db.User,
            attributes: ["id", "name", "role", "image"]
        }
    }) 
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
}

