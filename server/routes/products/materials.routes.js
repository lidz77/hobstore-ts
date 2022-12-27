module.exports = (app) => {
  const materialsController = require('../../controllers/products/materials.controller');
  var materialsRouter = require('express').Router();

  materialsRouter.get('/', materialsController.findAll);
  materialsRouter.post('/', materialsController.create);
  materialsRouter.delete('/:id', materialsController.delete);
  materialsRouter.put('/:id', materialsController.update);

  app.use('/api/products/materials', materialsRouter);
};
