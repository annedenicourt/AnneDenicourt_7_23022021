const db = require('../models');
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createPost = (req, res, next) => {
    //console.log(req.file)
    //console.log(res.locals.userId)
    
    db.Post.create({
        UserId: 1, //donnée provisoire en attendant de récupérer le userId du token
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
        //image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    })
        .then(post => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }))
}

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [
            ['id', 'DESC']
      ],
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }))
}

/*exports.createPost = (req, res, next) => {
    const post = {
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    }
    console.log(post)
    res.status(201).json({ message: 'Post créé !' })
  };*/

  /*exports.createPost = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create ({
            email: req.body.email,
            name: req.body.name,
            password: hash
        })
        .then(user =>{
            res.status(201).json({ message: 'Utilisateur créé !'})
        })
        .catch(err => console.log('User_create', err))
            
    })
    .catch(error => res.status(500).json({ error })) 
};*/
