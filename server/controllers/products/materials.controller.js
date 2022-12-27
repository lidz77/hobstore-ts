const db = require('../../models')
const Materials = db.materials;

exports.create = (req, res) => {
  const name = req.body.name;
  if(!name){
    res.status(400).send({
      message: "name must be required"
    });
    return;
  }

  Materials.create({
    name: name
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Error while creating new materials'
    })
  });
}

exports.findAll = (req, res) => {
  Materials.findAll({
    where: null
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Cant get the materials'
    })
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Materials.destroy({
    where: {
      id: id
    }
  }).then((result) => {
    console.log(result);
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
  console.log(req);
  const id = req.params.id;
  const data = {
    name: req.body.name
  };

  Materials.update(data, {
    where: {
      id: id
    }
  }).then((result) => {
    if(result == 1){
      res.send({
        message: `Update materials id ${id} successfully`,
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
