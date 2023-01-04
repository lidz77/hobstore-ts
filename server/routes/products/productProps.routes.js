module.exports = (app) => {
  const productPropsController = require("../../controllers/products/productProps.controller");
  var productPropsRouter = require("express").Router();

  //   productPropsRouter.get("/", productPropsController.findAll);
  productPropsRouter.post("/", productPropsController.create);
  productPropsRouter.delete("/", productPropsController.delete);
  productPropsRouter.put("/:id", productPropsController.update);

  app.use("/api/products/props", productPropsRouter);
};
