const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  
  if(token){
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        //not valid token
        res.status(401).json({ you: "can't touch this!" })
      }else {
        next();
      }
    })
  }else {
    res.status(401).json({message: "I need some authorization!"})
  }
};