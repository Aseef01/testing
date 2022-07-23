// Third-party Module
const express = require('express');
const app = express();

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
  url: `rtsp://admin:888888@192.168.38.58:8554/profile0`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
});

// the endpoint our RTSP uses
app.ws('/api/stream', handler);

// Declaration Variable
const port = process.env.PORT || 3004
const content = 'content'

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render(content, {
        title: 'Login Page',
        content: 'contents/login',
        scriptUrl,
    })
})

app.get('/homepage', (req, res) => {
    res.render(content, {
        title: 'Home Page',
        content: 'contents/homePage',
        scriptUrl,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})