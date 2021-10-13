const Router = require("express").Router;
const router = Router();

const NewsController = require("../controllers/news.controller");

router.get("/", NewsController.getNews);

module.exports = router;
