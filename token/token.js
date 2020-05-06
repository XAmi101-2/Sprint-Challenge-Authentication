const jwt = require('jsonwebtoken');
const secrets = require('./secrets');

module.exports = (user) => {
    const payload = {
      username: user.username,
      subject: user.id,
      password: user.password,
    };
    const options = {
      expiresIn: '4h',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}