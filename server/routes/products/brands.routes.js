module.exports = (app) => {
  const brandsController = require('../../controllers/products/brands.controller');
  var brandsRouter = require('express').Router();

  brandsRouter.get('/', brandsController.findAll);
  brandsRouter.post('/', brandsController.create);
  brandsRouter.delete('/:id', brandsController.delete);
  brandsRouter.put('/:id', brandsController.update);

  app.use('/api/products/brands', brandsRouter);
};
