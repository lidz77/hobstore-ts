const helper = require("../helper");
const fs = require("fs");
const db = require("../../models");
const fr = require("filereader");
const uploadMultipleImages = require("../../middlewares/upload");
const ProductImages = db.productImages;

exports.uploadImages = async (req, res) => {
  try {
    await uploadMultipleImages(req, res);
    if (req.files === 0) {
      return res.send("You must select a file.");
    }
    req.files.forEach((item, i) => {
      ProductImages.create({
        type: item.mimetype,
        name: item.originalname,
        data: fs.readFileSync(
          __basedir + "/resources/static/assets/uploads/" + item.filename
        ),
      }).then((result) => {
        fs.writeFileSync(
          __basedir + "/resources/static/assets/tmp/" + result.name,
          result.data
        );
        return res.send({
          message: "File has been uploaded",
          id: result.id,
        });
      });
    });

    // ProductImages.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: fs.readFileSync(
    //     __basedir + '/resources/static/assets/uploads/' + req.file.filename
    //   )
    // }).then((result) => {
    //   fs.writeFileSync(
    //     __basedir + '/resources/static/assets/tmp/' + result.name,
    //     result.data
    //   );
    //   console.log(result);
    //   return res.send('File has been uploaded');
    // });
  } catch (e) {
    console.log(e);
    return res.send(`Error while trying uploading file ${e}`);
  }
};

//unneccesary, update is called at product main controller
exports.update = (req, res) => {
  const idArray = req.body.idArray;
  const productId = req.body.productId;
  ProductImages.update(
    { productId: productId },
    {
      where: {
        id: idArray,
      },
    }
  )
    .then((result) => {
      res.send({
        message: `IDs ${idArray} has been added to product ${productId}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error occurs on adding photos to product, ${err}`,
      });
    });
};

exports.findByProductId = (req, res) => {
  const id = req.params.id;
  ProductImages.findAll({
    where: {
      productId: id,
    },
  })
    .then((result) => {
      if (result) {
        const images = result.map((item) => {
          return {
            id: item.id,
            alt: item.name,
            url: helper.convertUrl(item.data),
          };
        });
        res.send(images);
      } else {
        res.status(404).send({
          message: `Coulnt find ID ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error while retrieving data from id ${id}, ${err}`,
      });
    });
};

exports.findAll = (req, res) => {
  ProductImages.findAll()
    .then((result) => {
      let imagesInfo = [];
      result.map((item) => {
        let alt = item.name;
        let url = helper.convertUrl(item.data);
      });
      imagesInfo.push({ alt, url });
      res.send(imagesInfo);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occur while retrieving images, please check the logs",
      });
    });
};
