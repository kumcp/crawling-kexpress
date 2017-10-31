const express = require('express')
const router = express.Router()
const path = require("path")
const autoSearch = require("./controllers/autoSearch")


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/login.html"))
})

router.post('/autosearch', autoSearch)


module.exports = router