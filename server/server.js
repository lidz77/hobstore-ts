const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3084;
const clientPort = 3000;
global.__basedir = __dirname; //base directory
var corsOptions = {
  'origin': `http://localhost:${clientPort}`
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//declaire db models
const db = require('./models');
// drops constraints
// db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
//   db.sequelize.sync(
//     {force: true}
//   );
//   useRoutes();
// });
db.sequelize.sync(
  // drop existing table an resync db
  // { force: true }
).then(() => {
  useRoutes();
});

//test connection
app.get('/', (req, res) => {
  res.json({
    message: 'Test success!'
  })
});


//routes
function useRoutes() {
  console.log('use routes');
  require('./routes/categories.routes')(app);
  require('./routes/products/productImages.routes')(app);
  require('./routes/products/dimensions.routes')(app);
  require('./routes/products/brands.routes')(app);
  require('./routes/products/materials.routes')(app);
  require('./routes/products/products.routes')(app);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
