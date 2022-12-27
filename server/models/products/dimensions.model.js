module.exports = (sequelize, Sequelize) => {
  const Dimensions = sequelize.define('dimensions', {
    name: {
      type: Sequelize.STRING
    }
  })
  return Dimensions
}
