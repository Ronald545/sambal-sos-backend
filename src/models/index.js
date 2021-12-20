const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

require('dotenv').config();

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
console.log('We are in ' + env);

const config = require('../../config/config.js')

const db = {}

let sequelize;

if(env === 'development') {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    )
  }
} else if (env === 'production') {
  console.log("in production");
  sequelize = new Sequelize('sambalsos', process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'postgres',
    database: 'sambalsos',
    host: process.env.DB_HOST,
    dialectOptions: {
      host: process.env.DB_HOST
    }
  })
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
