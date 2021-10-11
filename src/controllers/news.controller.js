const axios = require("axios");
const APIKEY = process.env.APIKEY;

class News {
  getAllNews() {
    return axios.get("https://newsapi.org/v2/top-headlines?country=mx&apiKey=" + APIKEY);
  }

  getNewsByTerm(term) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const from = yesterday.toDateString();
    return axios.get(`https://newsapi.org/v2/everything?q=${term}&from=${from}&sortBy=popularity&apiKey=${APIKEY}`);
  }
}

module.exports = News;
