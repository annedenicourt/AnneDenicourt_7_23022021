const db = require('../models');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
require('dotenv').config();


/*exports.createComment = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    const userName = decodedToken.userName;
    console.log(userId)
    console.log(userName)

    //db.Post.findOne({where: { id: req.body.postId }})
    db.Comment.create({
        UserId: userId,
        content: req.body.content,
    })
        .then(comment => res.status(201).json({ message: 'Commentaire créé' }))
        .catch(error => res.status(400).json({ error }))  
}*/

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll()
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
}



exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;
    //console.log(userId)

    db.Post.findOne({ where: { id: req.body.PostId } })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post introuvable !' })
            }
            db.Comment.create({
                content: req.body.content,
                PostId: req.body.PostId
            })
            .then(comment => res.status(201).json({ message: 'Commentaire créé' }))
            .catch(error => res.status(400).json({ error }))
        })
    .catch(error => res.status(400).json({ message: "erreur" }))
}


