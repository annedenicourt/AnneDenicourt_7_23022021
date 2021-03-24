const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw 'Token d\'authentification manquant !';
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Identifiant utilisateur invalide';
        } else {
            console.log("jwt succes userId", userId)
            next();
        }
    } catch (error) {
        return res.status(400).json({ error })
    }
};