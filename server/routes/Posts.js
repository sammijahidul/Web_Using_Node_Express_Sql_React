const express = require('express');
const router = express.Router();
const {Posts, Likes} = require('../models');
const validationToken = require('../middlewares/AuthMiddleware');

// All Posts and likes regarding each post fetch route api and controller
router.get("/fetch", validationToken, async (req, res) => {
  try {
    const allPosts = await Posts.findAll({ include: [Likes]});
    const likedPosts = await Likes.findAll({where: 
      { UserId: req.user.id }
    });
    res.json({ allPosts: allPosts, likedPosts: likedPosts });   
  } 
  catch (error) {
    res.json({error: "Error while getting all posts"})
  }  
});

// Single Post fetch by id route api and controller
router.get("/byId/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);   
  } 
  catch (error) {
    res.json({error: "Error while getting this post"})
  }
});

// Post created by the user and likes api route and controller
router.get("/byuserId/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const allPosts = await Posts.findAll({where : {
      UserId: id },
      include: [Likes],
    });
    res.json(allPosts);    
  } 
  catch (error) {
    res.json({error: "Error while getting post by this user"})    
  } 
});

// Creating a Post api route and controller
router.post("/create", validationToken, async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);    
  } 
  catch (error) {
    res.json({error: "Error while creating post"});  
  }
});

// Update title of the Post api route and controller
router.patch("/update-title", validationToken, async (req, res) => {
  try {
    const { newTitle, id } = req.body;
    await Posts.update({title: newTitle}, {where: {id: id}});
    res.json(newTitle);
  } 
  catch (error) {
    res.json({error: "Error while updating post"})
  }
});

// Update postbody of the Post api route and controller
router.patch("/update-postBody", validationToken, async (req, res) => {
  try {
    const { newPostText, id } = req.body;
    await Posts.update({postText: newPostText}, {where: {id: id}});
    res.json(newPostText);   
  } 
  catch (error) {
    res.json({error: "Error while updating postbody"})
  }
});

// Post delete route api and controller
router.delete('/:postId', validationToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    await Posts.destroy({
      where : {
        id: postId
      },
    });
    res.json("Deleted");   
  } 
  catch (error) {
    res.json({error: "Error while deleting post"});
  }
});

module.exports = router;