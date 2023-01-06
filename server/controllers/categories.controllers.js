const db = require("../models");
const Categories = db.categories;
const Op = db.Sequelize.Op; //for find/ filters

// get all categories (with tittle filters)

exports.findById = (req, res) => {
  Categories.findByPk(req.params.id)
    .then((result) => {
      console.log("loaded categories");
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "error while get cat by id",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}` } } : null;
  Categories.findAll({
    where: condition,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occur pls check the logs",
      });
    });
};

//create new category;
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cant be empty",
    });
    return;
  }

  const category = {
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Categories.create(category)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating category",
      });
    });
};

//delete

exports.delete = (req, res) => {
  const idArray = req.query.idArray;
  Categories.destroy({
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

//update
exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body.data;
  console.log(req);

  Categories.update(data, {
    where: {
      id: id,
    },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: `Update category id ${id} successfully`,
          data: {
            ...data,
            id: parseInt(id),
          },
        });
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
