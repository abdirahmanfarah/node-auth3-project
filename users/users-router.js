const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, role('admin'),(req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function role(admin) {
  return function(req, res, next) {
    console.log("user", req.user)
    if(req.user && req.user.role && req.user.role.toLowerCase() === admin) {
      next();
    } else {
      res.status(403).json({ message: "Not admin."})
    }
  }
}

module.exports = router;
// onlyHouse('gryffindor'),