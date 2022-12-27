module.exports = (sequelize, Sequelize) => {
  const Materials = sequelize.define('materials', {
    name: {
      type: Sequelize.STRING
    }
  })
  return Materials
}
