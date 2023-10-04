const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const validationToken = require("../middlewares/AuthMiddleware");

// Getting all comments on each post api route and controller
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);   
  }
  catch (error) {
    res.json({error: "Error while getting comments"});
  }
});

// Create comment on each post api route and controller
router.post("/create", validationToken, async (req, res) => {
  try {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    const newComment = await Comments.create(comment);
    res.json(newComment);   
  } 
  catch (error) {
    res.json({error: "Error while creating comments"});   
  }
});

// Delete comment on each post api route and controller
router.delete("/:commentId", validationToken, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comments.destroy({where: {
      id: commentId
    },
  });
  res.json("Deleted Successfully");
  } 
  catch (error) {
    res.json({error: "Something wrong with deletation"})
  }
});

module.exports = router;