const db = require("../../models");
const Materials = db.materials;
const Brands = db.brands;
const Dimensions = db.dimensions;
const getModel = (modelName) => {
  switch (modelName) {
    case "materials":
      return Materials;
    case "brands":
      return Brands;
    case "dimensions":
      return Dimensions;
    default:
      break;
  }
};

exports.create = (req, res) => {
  const modelName = req.body.modelName;
  const name = req.body.name;
  if (!modelName) {
    res.status(400).send({
      message: "name must be required",
    });
    return;
  }
  getModel(modelName)
    .create({
      name: name,
    })
    .then((result) => {
      res.send({
        result: result,
        modelName: modelName,
        message: `Name ${name} created successfully in ${modelName}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating new materials",
      });
    });
};

exports.findAll = (req, res) => {
  getModel(modelName)
    .findAll({
      where: null,
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cant get the materials",
      });
    });
};

exports.delete = (req, res) => {
  console.log(req);
  const { id, modelName } = req.body;
  getModel(modelName)
    .destroy({
      where: {
        id: id,
      },
    })
    .then((result) => {
      console.log(result);
      if (result === 1) {
        res.send({
          message: `ID ${id} delete successfully in ${modelName}`,
          id: id,
          modelName: modelName,
        });
      } else {
        res.send({
          message: `Could not delete id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete ${id} due to ${err}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
  };

  getModel(modelName)
    .update(data, {
      where: {
        id: id,
      },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: `Update materials id ${id} successfully`,
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
