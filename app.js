const express = require("express");
require("dotenv").config();
const app = express();

const newsRouter = require("./src/routes/newsRoutes");

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log("App http://localhost:" + port);
});

app.use(express.static("public"));
app.use("/", newsRouter);
