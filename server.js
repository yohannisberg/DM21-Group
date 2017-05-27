const express = require('express'),
    app = module.exports = express(),
    config = require('./config.js'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    vimeoCtrl = require('./vimeoCtrl'),
    auth = require('./login');


let corsOptions = {
    origin: 'http://localhost:3001'
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

app.get('/api/videos', vimeoCtrl.getVideos);
app.get('/api/videos/:id', vimeoCtrl.getVideoById);
app.get('/api/videos/:id/comments', vimeoCtrl.getComments)
app.post('/api/comments/:id', vimeoCtrl.addComents);
app.get('/api/login', auth.login);
app.get('/api/callback', auth.callback);
app.get('/api/currentuser', auth.getUser);
app.get('/api/upload', vimeoCtrl.uploadVideo);


app.listen(config.port, () => {
    console.log('listening on port 3001')
})
