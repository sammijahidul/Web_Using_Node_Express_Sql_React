const {verify} = require('jsonwebtoken');

const validationToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged In" });
  try {
    const validToken = verify(accessToken, "ithastobesecreat");
    if(validToken) {
        return next();
    }
  } catch (error) {
    return res.json({error: error});
  }
};

module.exports = validationToken;