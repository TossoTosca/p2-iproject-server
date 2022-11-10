const router = require("express").Router();
const newsController = require('../controllers/newsController')

router.get('/indo', newsController.fetchIndoNews)

module.exports = router