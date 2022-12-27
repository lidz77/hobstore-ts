
module.exports = (app) => {
  const dimensionsController = require('../../controllers/products/dimensions.controller');
  var dimensionsRouter = require('express').Router();

  dimensionsRouter.post('/', dimensionsController.create);
  dimensionsRouter.get('/', dimensionsController.findAll);
  dimensionsRouter.delete('/:id', dimensionsController.delete);
  dimensionsRouter.put('/:id',dimensionsController.update);

  app.use('/api/products/dimensions', dimensionsRouter);
};
