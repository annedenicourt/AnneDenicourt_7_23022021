exports.createComment = (req, res, next) => {
    const comment = {
        content: req.body.content,
    }
    console.log(comment)
    res.status(201).json({ message: 'Commentaire créé !'})
};