const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');

exports.signup = (req, res, next) => {
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
};


exports.login = (req, res, next) => {
    res.status(201).json({ message: 'Utilisateur connecté !'})
    console.log("utilisateur connecte")
       
};