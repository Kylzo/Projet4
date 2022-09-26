const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    firstname:
    {
      type: String,
      required: true
    },
    user_id:
    {
      type: String,
      required: true
    },
    date_creation:
    {
      type: Date,
      default: Date.now
    },
    title:
    {
      type: String,
      required: true
    },
    text:
    {
      type: String,
      required: true
    },
    image_url:
    {
      type: String,
      default: ''
    },
    likes:
    {
      type: Number,
      default: 0
    },
    users_liked: [String],
  });

module.exports = mongoose.model('Post', postSchema);