exports.signup = (req, res, next) => {
    res.status(201).json({ message: 'Utilisateur créé !'})
};