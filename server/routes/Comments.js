const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const validationToken = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/create", validationToken, async (req, res) => {
  const comment = req.body;
  const newComment = await Comments.create(comment);
  res.json(newComment);
});

module.exports = router;