const express = require("express")
const SalesRoute = require("./src/routes/salesRoute")

const app = express();

app.use(SalesRoute);

app.listen(3000, () => {
    console.log("running");
})

