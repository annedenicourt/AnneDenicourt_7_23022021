exports.createPost = (req, res, next) => {
    const post = {
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    }
    console.log(post)
    res.status(201).json({ message: 'Post créé !' })
  };



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


/*exports.createPost = (req, res, next) => {
    db.Post.create({
        content: req.body.content,
        ownerId: res.locals.userId,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    })
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(400).json({ error }))
}*/