/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const secret = require('../token/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.auth

  if(token){
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({ message: 'you shall not pass!' });
      } else {
        req.user = {
          username: decodedToken.username
        };
        next()
      }
    })
  }};
