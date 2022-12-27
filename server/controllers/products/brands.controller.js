const db = require('../../models')
const Brands = db.brands;

exports.create = (req, res) => {
  const name = req.body.name;
  if(!name){
    res.status(400).send({
      message: "name must be required"
    });
    return;
  }

  Brands.create({
    name: name
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while creating new brand'
    })
  });
}

exports.findAll = (req, res) => {
  Brands.findAll({
    where: null
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Cant get the brands'
    })
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Brands.destroy({
    where: {
      id: id
    }
  }).then((result) => {
    if (result === 1) {
      res.send({
        message: `ID ${id} delete successfully`,
        id: id
      })
    } else {
      res.send({
        message: `Could not delete id ${id}`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Could not delete ${id} due to ${err}`
    })
  });
}

exports.update = (req, res) => {
  const id = req.params.id;
  const data = {
    name: req.body.name
  };

  Brands.update(data, {
    where: {
      id: id
    }
  }).then((result) => {
    if(result == 1){
      res.send({
        message: `Update brand id ${id} successfully`,
        data: {
          ...data,
          id: parseInt(id)
        }
      })
    }else{
      res.send({
        message: `Cannot update id ${id}. Id not found or req.body is empty`
      })
    }
  }).catch((err) => {
    res.status(500).send({
      message: `Error while updating id ${id}. Error: ${err}`
    })
  });
}
