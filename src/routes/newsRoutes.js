const Router = require("express").Router;
const News = require("../controllers/news.controller");

const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

const newsController = new News();
const router = Router();

router.get("/", (req, res) => {
  let responsePromise;
  if (!req.query.search || req.query.search === "") {
    responsePromise = newsController.getAllNews();
  } else {
    responsePromise = newsController.getNewsByTerm(req.query.search);
  }
  responsePromise
    .then((response) => {
      const src = fs.readFileSync(path.join(__dirname, "..", "views", "news.handlebars"), "utf-8");
      const template = handlebars.compile(src);
      const view = template({
        news: response.data.articles,
      });
      res.send(view);
      // res.render
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
