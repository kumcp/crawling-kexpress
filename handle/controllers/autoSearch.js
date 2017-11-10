const express = require('express')
const autoSearch = express.Router()
const { Chromeless } = require('chromeless')
const { join } = require('path')

autoSearch.post('/autosearch', (req, res) => {

    let groups = req.body.data;
    let saveDir = './data';

    for (let index in groups) {
        console.log(groups[index].groupName + ": " + groups[index].keywords)
    }

    searchKeyword("cat")
    res.send("Test")
})

function searchKeywords(keyword) {
    search(keyword)
    .catch(console.error.bind(console))
    .then((imURLs) => {
        console.log(imURLs);
    })
}


async function search(keyword) {
    const chromeless = new Chromeless()

    var imageUrlList= [];

    imageUrlList = await chromeless
        .goto('https://www.bing.com/images/discover?form=Z9LH1')
        .type(keyword, 'input[name="q"]')
        .click("[name=go]")
        .wait('[class=dg_b]')
        .scrollToElement("footer").wait(800)
        .evaluate((imList) => {
            Array.prototype.forEach.call(document.getElementsByClassName("imgpt"), function(element) {
                let imagePath = JSON.parse(element.children[0].getAttribute('m')).murl;
                imList.push(imagePath);
            });
            return imList
        }, imageUrlList);
        

    await chromeless.end();

    return imageUrlList;
}


module.exports = autoSearch