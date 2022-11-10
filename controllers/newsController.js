require('dotenv').config()
const axios = require('axios')



class Controller {
    static async fetchIndoNews(req, res, next) {
        try {
            let apiKey = process.env.news_apiKey
            let url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`
            const indoNews = await axios.get(`${url}`)
            const getArticle = indoNews.data.articles
            res.status(200).json(getArticle)
        } catch (error) {
            next(error)
        }
    }

    static async searchNews(req, res, next) {
        try {
            const { input } = req.query
            let apiKey = process.env.news_apiKey
            let url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`
            const searchedNews = await axios.get(`${url}`)
            res.status(200).json(searchedNews)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller