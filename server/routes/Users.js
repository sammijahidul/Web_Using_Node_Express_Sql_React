const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');

router.post("/auth", async (req, res) => {
  const { username, password} = req.body; 
   bcrypt.hash(password, 10).then((hash) => {
    Users.create({
        username: username,
        password: hash
    })
    res.json('Success');
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if(!user) {
    res.json({error: "User was not found"});
  } else {
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error: "Password didn't match"});
        } else {
            res.json("Logged In")
        }
    })
  } 
    // if (!user) {
    //     // User not found
    //     res.status(400).json({ error: "User Doesn't Exist" });
    // } else {
    //     // User found, now compare passwords
    //     bcrypt.compare(password, user.password).then((match) => {
    //     if (!match) {
    //         // Passwords don't match
    //         res.status(401).json({ error: "Wrong Username and Password" });
    //     } else {
    //         // Passwords match, user logged in
    //         res.json("Logged in");
    //     }
    //     });
    // }
});

module.exports = router;













// https://www.youtube.com/redirect?event=comments&redir_token=QUFFLUhqbWhDNGlaQzRuR2N2QWo0TldZSHR2YjJLbHJyQXxBQ3Jtc0tsQjBZZHZIWnBrWVFKTGk1NmE3VUtLQ2NxY2tJMERrVzRFUl9LTEQxNWx3NE84Rm1iT04td25MQkJ5Y1lfVUFVUGp5VFQ5Vm5IQ1AxdzR2WG93RGc1OE96OHNZb0VvWDVZS2ZiV01ETjdhRGZQckp0dw&q=https%3A%2F%2Fgithub.com%2Fsangnguyen190997%2Fshopping-ecommerce&stzid=UgzRUw9EVOEtxiULR7B4AaABAg