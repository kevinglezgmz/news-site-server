const axios = require("axios");
const APIKEY = process.env.APIKEY;

const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
class NewsController {
  static getNews(req, res) {
    let responsePromise;
    if (!req.query.search || req.query.search === "") {
      responsePromise = NewsController.getAllNews(req, res);
    } else {
      responsePromise = NewsController.getNewsByTerm(req, res);
    }

    responsePromise
      .then((response) => {
        const src = fs.readFileSync(path.join(__dirname, "..", "views", "news.handlebars"), "utf-8");
        const template = handlebars.compile(src);
        const view = template({
          news: response.data.articles,
        });
        res.send(view);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getAllNews(req, res) {
    return axios.get("https://newsapi.org/v2/top-headlines?country=mx&apiKey=" + APIKEY);
  }

  static getNewsByTerm(req, res) {
    const term = req.query.search;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const from = yesterday.toDateString();
    return axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${from}&sortBy=popularity&apiKey=${APIKEY}`);
  }
}

module.exports = NewsController;
