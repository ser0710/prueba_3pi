const express = require("express")
const uuid = require('uuid');
const bodyParser = require('body-parser');
const SalesRoute = require("./src/routes/salesRoute")
const ProductsRoute = require("./src/routes/productsRoute")

const app = express();

app.use(bodyParser.json());

app.use(SalesRoute);
app.use(ProductsRoute);

app.listen(3000, () => {
    console.log("running");
    console.log(uuid.v4());
})

