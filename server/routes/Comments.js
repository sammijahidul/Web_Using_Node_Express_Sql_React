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
  const username = req.user.username;
  comment.username = username;
  const newComment = await Comments.create(comment);
  res.json(newComment);
});

router.delete("/:commentId", validationToken, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comments.destroy({where: {
      id: commentId
    },
  });
  res.json("Deleted Successfully");
  } catch (error) {
    res.json({error: "Something wrong with deletation"})
  }
});

module.exports = router;