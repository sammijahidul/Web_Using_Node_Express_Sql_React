const express = require('express');
const router = express.Router();
const {Posts, Likes} = require('../models');
const validationToken = require('../middlewares/AuthMiddleware');

router.get("/fetch", validationToken, async (req, res) => {
  const allPosts = await Posts.findAll({ include: [Likes]});
  const likedPosts = await Likes.findAll({where: { UserId: req.user.id}});
  res.json({ allPosts: allPosts, likedPosts: likedPosts });
});

router.get("/byId/:id", async(req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async(req, res) => {
  const id = req.params.id;
  const allPosts = await Posts.findAll({where : {
    UserId: id },
    include: [Likes],
  });
  res.json(allPosts);
});

router.post("/create", validationToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.delete('/:postId', validationToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
      where : {
        id: postId
      },
    });
    res.json("Deleted");
});



module.exports = router;