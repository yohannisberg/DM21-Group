const express = require('express'),
    config = require('./config'),
    // massive = require('massive'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    // connString = config.MASSIVE_URI,
    // massiveInstance = massive.connectSync({connectionString: connString}),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express(),
    axios = require('axios'),
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
app.post('/api/upload', vimeoCtrl.uploadVideo);
app.post('/api/comments/:id', vimeoCtrl.addComents);
app.post('/api/login', vimeoCtrl.generateToken);
// app.get('/api/login', auth.login);

app.listen(config.port, () => {
    console.log('listening on port 3001')
})

