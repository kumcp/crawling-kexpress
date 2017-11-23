
var crypto = require('crypto');



const saveImageList = async function (urlList, imageDir, callback) {
    let divider = 10;
    let bounding = (urlList.length - 1) / divider + 1;
    for (let i = 0; i < bounding; i++) {
        await saveImageGroup(urlList.slice(i * divider, (i + 1) * divider), imageDir, callback);
    }
}


const saveImageGroup = async function (urlList, imageDir, callback) {
    urlList.forEach(function (url) {
        saveImage(url, imageDir, callback)
    }, this);
}


var fs = require('fs'),
    request = require('request');

const saveImage = function (url, imageDir, callback) {

    let ext = url.split(".").slice(-1)[0];
    if (["jpg", "png", "jpeg", "JPG", "gif"].indexOf(ext) >= 0) {
        let nameHashed = imageDir + crypto.createHash('sha1').update(url).digest('hex') + "." + ext;
        try{
            request.head(url, function (err, res, body) {
                request(url, {
                    jar: false,
                    maxRedirects: 1
                }).on('error', function(e){
                    console.log(e);
                })
                .pipe(fs.createWriteStream(nameHashed)
                    .on('error', function () {
                        callback('');
                    })
                    .on('close', function () {
                        callback(nameHashed);
                    }));
            });
        } catch(e){
            console.log(e)
        }
        
    }
}


module.exports = {
    saveImageList,
    saveImage
}