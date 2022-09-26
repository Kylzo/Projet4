const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        is_admin: 0,
      });
      user
        .save()
        .then(() => res.status(201).json({
          type: 'success',
          message: 'Utilisateur créé !',
        }))
        .catch((error) => res.status(401).json({ error: 'Veuillez remplir les champs obligatoires*.' })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};




exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Adresse mail incorrecte.' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrecte.' });
          }
          res.status(200).json({
            is_admin: user.is_admin,
            user_id: user._id,
            token: jwt.sign({
              userId: user._id,
            }, config.jwtKey, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
