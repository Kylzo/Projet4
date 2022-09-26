const jwt = require("jsonwebtoken");
const config = require("../config");



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.jwtKey);
        const userId = decodedToken.userId;


        req.auth = {
            userId,
        };

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable.';
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée !" });
    }
};