const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");



router.post("/", auth, multer, postController.createPost);
router.put("/:id", auth, multer, postController.updatePost);
router.post("/:id/like", auth, multer, postController.likePost);
router.delete("/:id", auth, multer, postController.deletePost);
router.get("/:id", auth, postController.getOnePost);
router.get("/", postController.getAllPosts);



module.exports = router;
