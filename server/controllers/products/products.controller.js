const e = require("express");
const db = require("../../models");
const helper = require("../helper");
const Op = db.Sequelize.Op;
const Products = db.products;
const Categories = db.categories;
const Dimensions = db.dimensions;
const Brands = db.brands;
const Materials = db.materials;
const ProductImages = db.productImages;

const relationalArray = [
  {
    model: Categories,
    as: "category",
    attributes: ["id", "name"],
  },
  {
    model: Dimensions,
    as: "dimension",
    attributes: ["id", "name"],
  },
  {
    model: Brands,
    as: "brand",
    attributes: ["id", "name"],
  },
  {
    model: Materials,
    as: "material",
    attributes: ["id", "name"],
  },
  {
    model: ProductImages,
    as: "productImages",
    attributes: ["id"],
  },
];
const clientFindAllArray = [
  {
    model: Brands,
    as: "brand",
    attributes: ["name"],
  },
  {
    model: ProductImages,
    as: "productImages",
    attributes: ["name", "data"],
    limit: 1,
  },
  // {
  //   model: Dimensions,
  //   as: "dimension",
  //   attributes: ["name"],
  //   limit: 1,
  // },
];

exports.create = (req, res) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    available: req.body.available,
    color: req.body.color,
    price: req.body.price,
    brandId: req.body.brand.id === 0 ? null : req.body.brand.id,
    dimensionId: req.body.dimension.id === 0 ? null : req.body.dimension.id,
    materialId: req.body.material.id === 0 ? null : req.body.material.id,
    categoryId: req.body.category.id === 0 ? null : req.body.category.id,
  };
  let productId;
  if (!newData.title) {
    res.status(400).send({
      message: "Title must be required",
    });
    return;
  }
  Products.create(newData)
    .then((productResult) => {
      productId = productResult.id;
      ProductImages.update(
        { productId: productId },
        {
          where: {
            id: req.body.imagesIdsArray,
          },
        }
      ).then(
        Products.findByPk(productId, {
          include: relationalArray,
        }).then((result) => {
          res.send(result);
        })
      );
      // Products.findByPk(productId).then(
      //   Products.findByPk(productId, {
      //     include: relationalArray
      //   }).then((result) => {
      //     console.log(result);
      //     res.send(result);
      //   })
      // )
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating new product",
      });
    });
};

exports.findAllProperties = (req, res) => {
  Promise.all([
    Materials.findAll({ attributes: ["id", "name"] }), //0
    Brands.findAll({ attributes: ["id", "name"] }), // 1
    Dimensions.findAll({ attributes: ["id", "name"] }), // 2
    Categories.findAll({ attributes: ["id", "name"] }), //3
  ])
    .then((result) => {
      const data = {
        materials: result[0],
        brands: result[1],
        dimensions: result[2],
        categories: result[3],
      };
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error while retrieving union table`,
      });
    });
};

exports.findAll = (req, res) => {
  Products.findAll({
    attributes: ["id", "title", "description", "available", "color", "price"],
    where: null,
    include: relationalArray,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cant get the product",
      });
    });
};

exports.clientFindAll = (req, res) => {
  const limit = 4;
  let { pageNumber, searchTerm, brand, dimension, category } = req.query;
  var condition = { title: { [Op.like]: `%${searchTerm}%` } };
  pageNumber = typeof pageNumber !== "undefined" ? parseInt(pageNumber) : 0;
  if (dimension != 0) {
    console.log("dimension", dimension);
    condition = { ...condition, dimensionId: { [Op.eq]: dimension } };
  }
  if (category != 0) {
    console.log("category", category);
    condition = { ...condition, categoryId: { [Op.eq]: category } };
  }
  if (typeof brand !== "undefined") {
    condition = { ...condition, brandId: { [Op.in]: brand } };
  }

  Products.findAndCountAll({
    attributes: ["id", "title", "price"],
    where: condition,
    limit: limit,
    offset: pageNumber * limit,
    include: clientFindAllArray,
  })
    .then((result) => {
      const data = result.rows.map((item) => {
        return {
          id: item.id,
          title: item.title,
          brand: item.brand.name,
          productImages: {
            alt: item.productImages[0].name,
            url: helper.convertUrl(item.productImages[0].data),
          },
        };
      });
      res.status(200).send({
        count: result.count,
        currentPage: pageNumber,
        totalPages: Math.ceil(result.count / limit),
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cant get the product",
      });
    });
};

exports.findById = (req, res) => {
  const productId = req.params.id;
  Products.findByPk(productId, {
    include: relationalArray,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error while finding product", err);
    });
};

exports.delete = (req, res) => {
  const idArray = Array.isArray(req.query.idArray[0])
    ? req.query.idArray[0]
    : [req.query.idArray];
  Products.destroy({
    where: {
      id: idArray,
    },
  })
    .then((result) => {
      if (result > 0) {
        res.send({
          message: `ID ${idArray} delete successfully`,
          idArray: idArray.map(Number),
        });
      } else {
        res.send({
          message: `Could not delete id ${idArray}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete id ${idArray} due to ${err}`,
      });
    });
};

exports.update = (req, res) => {
  const productId = req.params.id;
  const data = req.body.data;
  console.log(req);
  Products.update(data, {
    where: {
      id: productId,
    },
  })
    .then((result) => {
      if (result == 1) {
        Products.findByPk(productId)
          .then((result) => {
            if (data.dimension?.id ?? 0 !== 0) {
              result.setDimension(data.dimension.id);
            }
            if (data.brand?.id ?? 0 !== 0) {
              result.setBrand(data.brand.id);
            }
            if (data.material?.id ?? 0 !== 0) {
              result.setMaterial(data.material.id);
            }
            if (data.imagesIdsArray.length !== 0) {
              ProductImages.update(
                { productId: productId },
                {
                  where: {
                    id: req.body.data.imagesIdsArray,
                  },
                }
              );
            }
          })
          .then(
            Products.findByPk(productId, {
              include: relationalArray,
            }).then((result) => {
              res.send({
                message: `Update product id ${productId} successfully`,
                data: {
                  data: result,
                  id: parseInt(productId),
                },
              });
            })
          );
      } else {
        res.send({
          message: `Cannot update id ${productId}. Id not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error while updating id ${productId}. Error: ${err}`,
      });
    });
};
