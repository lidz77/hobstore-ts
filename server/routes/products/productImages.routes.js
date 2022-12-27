module.exports = (app) => {
  const productImagesController = require("../../controllers/products/productImages.controllers");
  var productsImagesRouter = require("express").Router();
  // const uploadImages = require('../../middlewares/upload');

  // productsImagesRouter.get('/', productImagesController.findAll);
  productsImagesRouter.get("/:id", productImagesController.findByProductId);
  productsImagesRouter.post("/", productImagesController.uploadImages);
  productsImagesRouter.put("/", productImagesController.update);
  // productsImagesRouter.post('/', uploadImages.single('file'), productImagesController.uploadImage)
  app.use("/api/products/images", productsImagesRouter);
};
