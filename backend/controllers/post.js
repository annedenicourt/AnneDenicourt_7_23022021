const db = require('../models');
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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
    const like = req.body.like

    db.Post.findOne({ where: { id: req.body.PostId } })

    .then(post => {
        if (!post) {
            return res.status(404).json({ error: 'Post introuvable !' })
        } else if(like === false) {
            db.Like_post.create({
                PostId: req.body.PostId,
                OwnerId: userId
            })
            .then(like => res.status(201).json({ message: 'Post liké' }))
            .catch(error => res.status(400).json({ error }))
        } else if(like === true) {
            db.Like_post.destroy({ where: { OwnerId: userId } })
            .then(like => res.status(201).json({ message: 'Post disliké' }))
            .catch(error => res.status(400).json({ error }))
        }
    })
    .catch(error => res.status(400).json({ message: "erreur" }))     
}

exports.deletePost = (req, res, next) => {
    db.Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé'}))
        .catch(error => res.status(400).json({ error: 'Pb suppression commentaire' }));
};

exports.getAllPosts = (req, res, next) => {
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

exports.getAllLikePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    
    db.Like_post.findAll({
        where: { PostId: req.params.id, OwnerId: userId},
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
            attributes: ["name", "role", "image"]
        }
    }) 
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
}

