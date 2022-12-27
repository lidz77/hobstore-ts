module.exports = (app) => {
  const productsController = require("../../controllers/products/products.controller");
  var productsRouter = require("express").Router();

  // productsRouter.get('/brands', brandsController.findAll);
  productsRouter.post("/", productsController.create);
  productsRouter.get("/client", productsController.clientFindAll);
  productsRouter.get('/props', productsController.findAllProperties);
  productsRouter.get("/", productsController.findAll);
  productsRouter.get("/:id", productsController.findById);
  // dunno why express thinks /:id can be dimension or brands, should add ?id=:id, or should put parent's "get" function to the last
  productsRouter.delete("/", productsController.delete);
  productsRouter.put("/:id", productsController.update);

  app.use("/api/products", productsRouter);
};
