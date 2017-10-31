const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

// Set bodyparser for using body in request
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Static routes
app.use('/static', express.static('./public/static'))
app.use(express.static('./public'))
app.use('/dist', express.static('./dist'))

//Controller routes
const router = require('./handle/router.js')
app.use('/', router)


// Render vue on server before response
const { createBundleRenderer } = require('vue-server-renderer');
const bundleRenderer = createBundleRenderer(
    require('./dist/vue-ssr-bundle.json'),
    {
        template: fs.readFileSync('./public/vue-index.html', 'utf-8')
    }
);

app.use('/vue', (req, res) => {
    bundleRenderer.renderToStream({ url: req.path })
        .pipe(res)
})



app.listen(7777, function () {
    console.log('App is hearing from port 7777')
})