const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const validateToken = require('../middlewares/AuthMiddleware');

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
            const accessToken = sign({
              username: user.username,
              id: user.id
            }, "ithastobesecreat");
          res.json({token: accessToken, username: username, id: user.id});  
        }
    })
  } 
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);

});

router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;

  const profileinfo = await Users.findByPk(id, {attributes : {
    exclude: ["password"]
    },
  });
  res.json(profileinfo);
})

module.exports = router;













// https://www.youtube.com/redirect?event=comments&redir_token=QUFFLUhqbWhDNGlaQzRuR2N2QWo0TldZSHR2YjJLbHJyQXxBQ3Jtc0tsQjBZZHZIWnBrWVFKTGk1NmE3VUtLQ2NxY2tJMERrVzRFUl9LTEQxNWx3NE84Rm1iT04td25MQkJ5Y1lfVUFVUGp5VFQ5Vm5IQ1AxdzR2WG93RGc1OE96OHNZb0VvWDVZS2ZiV01ETjdhRGZQckp0dw&q=https%3A%2F%2Fgithub.com%2Fsangnguyen190997%2Fshopping-ecommerce&stzid=UgzRUw9EVOEtxiULR7B4AaABAg