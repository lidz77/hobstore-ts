module.exports= (sequelize, Sequelize) => {
  const Products = sequelize.define('products', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    available: {
      type: Sequelize.BOOLEAN
    },
    // data type of ref details table should be converted b4 res
    number_of_hobs: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
  })
  return Products;
}
