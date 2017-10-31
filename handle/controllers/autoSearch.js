const express = require('express')
const autoSearch = express.Router()
const { Chromeless } = require('chromeless')

autoSearch.post('/autosearch', (req, res) => {

    let groups = req.body.data

    for (let index in groups) {
        console.log(groups[index].groupName + ": " + groups[index].keywords)
    }

    

    res.send("Test")
})

function searchKeyword(keyword){
    search(keyword).catch(console.error.bind(console))
} 


async function search(keyword) {
    const chromeless = new Chromeless()

    const screenshot = await chromeless
        .goto('https://www.google.com')
        .type(keyword, 'input[name="q"]')
        .press(13)
        .wait('#resultStats')
        .screenshot()

    console.log(screenshot) // prints local file path or S3 url

    await chromeless.end()
}


module.exports = autoSearch