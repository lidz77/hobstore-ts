//rename this file to db.config.js and set your db connect infos

module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'password',
  DB: 'databasename',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    accquire: 30000,
    idle: 1000
  }
}
