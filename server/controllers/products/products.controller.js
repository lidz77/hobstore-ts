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
    attributes: ["id","name"],
  },
  {
    model: Dimensions,
    as: "dimension",
    attributes: ['id',"name"],
  },
  {
    model: Brands,
    as: "brand",
    attributes: ['id',"name"],
  },
  {
    model: Materials,
    as: "material",
    attributes: ["id","name"],
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
  const title = req.body.title;
  let productId;
  if (!title) {
    res.status(400).send({
      message: "Title must be required",
    });
    return;
  }
  Products.create(req.body)
    .then((productResult) => {
      console.log(req.body);
      productId = productResult.id;
      ProductImages.update(
        { productId: productId },
        {
          where: {
            id: req.body.productImagesId,
          },
        }
      ).then(
        Products.findByPk(productId, {
          include: relationalArray,
        }).then((result) => {
          console.log(result);
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
    Materials.findAll() , //0
    Brands.findAll(), // 1
    Dimensions.findAll(), // 2
    Categories.findAll() //3
  ]).then((result) => {
    const data = {
      materialsList: result[0],
      brandsList: result[1],
      dimensionsList: result[2],
      categoriesList: result[3],
    }
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || `Error while retrieving union table`
    })
  })
}

exports.findAll = (req, res) => {
  Products.findAll({
  attributes: ['id', 'title', 'description','available', 'color', 'price'],
    where: null,
    include: relationalArray,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cant get the product",
      });
    });
};

exports.clientFindAll = (req, res) => {
  console.log(req.query);
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
  console.log(req.params);
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
  console.log(req);
  const idArray = req.query.idArray;
  Products.destroy({
    where: {
      id: idArray,
    },
  })
    .then((result) => {
      console.log(result);
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
  const id = req.params.id;
  const data = req.body.data;
  console.log(req);
  Products.update(data, {
    where: {
      id: id,
    },
  })
    .then((result) => {
      if (result == 1) {
        Products.findByPk(id)
          .then((result) => {
            if (data.dimensionId !== 0) {
              result.setDimension(data.dimensionId);
            }
            if (data.brandId !== 0) {
              result.setBrand(data.brandId);
            }
            if (data.materialId !== 0) {
              result.setMaterial(data.materialId);
            }
            // if(data.imageIds !== 0){
            //   result.setImage(data.imageIds);
            // }
          })
          .then(
            Products.findByPk(id, {
              include: relationalArray,
            }).then((result) => {
              res.send({
                message: `Update product id ${id} successfully`,
                data: {
                  data: result,
                  id: parseInt(id),
                },
              });
            })
          );
      } else {
        res.send({
          message: `Cannot update id ${id}. Id not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error while updating id ${id}. Error: ${err}`,
      });
    });
};
