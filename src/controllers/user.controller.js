const logger = require('../../winston-config')
const db = require('../models')

module.exports.createTestUser = (req, res) => {
  db.user.create({
    email: `sid${Math.random()*1000}@sid.com`,
    first_name: "sid",
    last_name: "sid",
    password: "sid"
  })
  .then(newUser => res.status(200).send(newUser))
}

module.exports.getAllUsers = (req, res) => {
  db.user.findAll({
    attributes: { exclude: ['password'] },
    include: db.flag
  })
    .then(users => {
      res.status(200).json({ status: true, data: users })
    })
    .catch(err => {
      logger.error(`DB Error: ${err.message}`)
      res.status(500).json({
        status: false,
        message: 'some error occured',
        error: err
      })
    })
}
