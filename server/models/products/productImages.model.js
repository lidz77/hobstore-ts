module.exports = (sequelize, Sequelize) => {
  const ProductImages = sequelize.define('productImages',{
    name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.BLOB('long')
    },
  });
  return ProductImages;
};
