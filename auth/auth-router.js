const router = require('express').Router();
const Users = require('./auth-model')
const generateToken = require('../token/token')
const bcrypt = require('bcryptjs')


router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  Users.add(user)
    .then(person => {
      res.status(201).json(person)
    })
    .catch(err => res.status(500).json({message: 'unable to register user'}))
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  Users.findBy({ username })
    .first()
    .then(person => {
      if(person && bcrypt.compareSync(password, person.password)){
        const token = generateToken(person)
        res.status(200).json({message: `Welcome ${person.username}`, token})
      } else {
        res.status(401).json({message: 'Invalid username or password'})
      }
    })
    .catch(err => res.status(500).json({message: 'unable to log in user?'}))
});

module.exports = router;
