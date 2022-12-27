module.exports = (sequelize, Sequelize) => {
  const Brands = sequelize.define('brands', {
    name: {
      type: Sequelize.STRING
    }
  })
  return Brands
}
