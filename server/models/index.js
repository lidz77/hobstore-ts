dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      accquire: dbConfig.pool.accquire,
      idle: dbConfig.pool.idle
    }
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.categories = require('./categories.model')(sequelize, Sequelize);
db.products = require('./products/products.model')(sequelize, Sequelize);
db.dimensions = require('./products/dimensions.model')(sequelize, Sequelize);
db.brands = require('./products/brands.model')(sequelize, Sequelize);
db.materials = require('./products/materials.model')(sequelize, Sequelize);
db.productImages = require('./products/productImages.model')(sequelize, Sequelize);
//relationship
db.categories.hasMany(db.products, {
  foreignKey: 'categoryId'
});
db.products.belongsTo(db.categories);
db.dimensions.hasMany(db.products, {
  foreignKey: 'dimensionId'
});
db.products.belongsTo(db.dimensions);
db.brands.hasMany(db.products, {
  foreignKey: 'brandId'
});
db.products.belongsTo(db.brands);
db.materials.hasMany(db.products, {
  foreignKey: 'materialId'
});
db.products.belongsTo(db.materials);
db.products.hasMany(db.productImages, {
  foreignKey: 'productId',
  onDelete: 'CASCADE'
});
db.productImages.belongsTo(db.products);

// db.products.belongsToMany(db.dimensions, {
//   through: 'product_dimension',
//   as: 'dimension',
//   foreignKey: 'product_id'
// });
// db.products.belongsToMany(db.brands, {
//   through: 'product_brand',
//   as: 'brand',
//   foreignKey: 'product_id'
// });
// db.products.belongsToMany(db.materials, {
//   through: 'product_material',
//   as: 'material',
//   foreignKey: 'product_id'
// });
// db.dimensions.belongsToMany(db.products, {
//   through: 'product_dimension',
//   as: 'product',
//   foreignKey: 'dimension_id'
// });
// db.brands.belongsToMany(db.products, {
//   through: 'product_brand',
//   as: 'product',
//   foreignKey: 'brand_id'
// });
// db.materials.belongsToMany(db.products, {
//   through: 'product_material',
//   as: 'product',
//   foreignKey: 'material_id'
// });


module.exports = db;
