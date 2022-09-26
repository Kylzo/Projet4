const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const imagesDirname = process.env.IMAGE_DIRNAME

exports.createPost = (req, res, next) => {

  const postDoc = req.body;
  postDoc.user_id = req.auth.userId;

  if (req.file) {
    postDoc.image_url = `${req.protocol}://${req.get('host')}/${imagesDirname}/${req.file.filename}`;
  }

  const postModel = new Post(postDoc);

  postModel
    .save()
    .then(() =>
      res.status(201).json({
        type: 'success',
      }),
    )
    .catch((error) =>
      res.status(400).json({
        type: 'error',
        publicMessage: error.message,
      }),
    );
};

exports.updatePost = async (req, res, next) => {

  try {
    const postId = req.params.id;
    const oldPost = await Post.findOne({ _id: postId });
    const postDoc = req.body;



    const docUser = await User.findOne({ _id: req.auth.userId })
    let isAdmin = docUser.is_admin


    //----------------------------------------
    // check ownership
    //----------------------------------------
    if (oldPost.user_id !== req.auth.userId && false === isAdmin) {
      res.status(401).json({
        type: 'error',
        publicMessage: 'vous n\'avez pas les permissions pour mettre à jour ce post.',
      });
    } else {

      //----------------------------------------
      // update the post
      //----------------------------------------
      const safePostDoc = {
        date_creation: Date.now(),
        title: postDoc.title,
        text: postDoc.text,
      };

      if (req.file) {
        if (oldPost.image_url) {
          const oldPath = path.join(__dirname, '..', imagesDirname, oldPost.image_url.split('/').pop());
          if (fs.existsSync(oldPath)) {
            fs.unlink(oldPath, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }

        safePostDoc.image_url = `${req.protocol}://${req.get('host')}/${imagesDirname}/${req.file.filename}`;
      }

      Post.updateOne(
        {
          _id: postId,
        },
        safePostDoc,
      )
        .then(() => res.status(200).json({
          type: 'success',
        }))
        .catch((error) => res.status(400).json({
          type: 'error',
          publicMessage: error.message,
        }));
    }
  } catch (error) {

    res.status(400).json({
      type: 'error',
      publicMessage: error.message,
    });
  }
};







exports.deletePost = async (req, res, next) => {
  try {

    const postId = req.params.id;
    const oldPost = await Post.findOne({ _id: postId });
    const docUser = await User.findOne({ _id: req.auth.userId })
    let isAdmin = docUser.is_admin

    if (oldPost.user_id === req.auth.userId || isAdmin) {
      Post.deleteOne({
        _id: req.params.id,
      })
        .then((thing) => res.status(200).json({
          type: 'success',
        }))
        .catch((error) => res.status(201).json({
          type: 'error',
          publicMessage: error.message,
        }));

      const filename = oldPost.image_url.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
      });

    } else {
      res.status(401).json({
        type: 'error',
        publicMessage: 'Vous n\'avez pas les permissions pour mettre à jour ce post.',
      });
    }

  } catch (error) {
    res.status(404).json({
      type: 'error',
      publicMessage: error.message,
    });
  }
};








exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.find().sort({ date_creation: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.likePost = async (req, res, next) => {

  try {


    const postId = req.params.id;
    const oldPost = await Post.findOne({ _id: postId });
    const userId = req.auth.userId;

    const hasAlreadyLiked = oldPost.users_liked.includes(userId);

    if (true === hasAlreadyLiked) {
      return res
        .status(401)
        .json({
          type: 'error',
          publicMessage: 'Veuillez vous connecter ou vous inscrire.',
        });
    } else {

      const nbLikes = oldPost.likes + 1;
      let usersLiked = oldPost.users_liked;
      usersLiked.push(userId);

      await Post.updateOne(
        {
          _id: postId,
        },
        {
          likes: nbLikes,
          users_liked: usersLiked,
        },
      );
      res.status(200).json({
        type: 'success',
      });
    }
  } catch (error) {
    res.status(404).json({
      type: 'error',
      publicMessage: error.message,
    });
  }
};