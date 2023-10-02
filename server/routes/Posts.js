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

router.post("/create", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});



module.exports = router;