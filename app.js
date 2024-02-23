const express = require("express");
const uuid = require('uuid');
const bodyParser = require('body-parser');
const SalesRoute = require("./src/routes/salesRoute");
const ProductsRoute = require("./src/routes/productsRoute");
const UsersRoute = require("./src/routes/usersRoute");
const ReportsRoute = require("./src/routes/reportsRoute");

const app = express();

app.use(bodyParser.json());

app.use(SalesRoute);
app.use(ProductsRoute);
app.use(UsersRoute);
app.use(ReportsRoute);

app.listen(3000, () => {
    console.log("running");
})

