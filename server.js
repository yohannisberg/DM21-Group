const express = require('express'),
    app = module.exports = express(),
    config = require('./config.js'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    vimeoCtrl = require('./vimeoCtrl'),
    mainCtrl = require('./mainCtrl');

let corsOptions = {
    origin: `http://localhost:${config.port}`
}
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true
}))

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/dist'));

app.get('/api/videos/:id', vimeoCtrl.getVideos);
app.get('/api/videos/channels/:channel', vimeoCtrl.getVideoByChannels);
app.get('/api/videos/:id/comments', vimeoCtrl.getComments)
app.post('/api/comments/:id', vimeoCtrl.addComents);
app.get('/api/login', mainCtrl.login);
app.get('/api/callback', mainCtrl.callback);
app.get('/api/currentuser', mainCtrl.getUser);
app.put('/api/upload', mainCtrl.uploadVideo);
app.get('/api/usersvideos', mainCtrl.usersVideos);
app.get('/api/videos/channels/:channel', vimeoCtrl.getVideoByChannels);

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
