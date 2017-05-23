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
    vimeoCtrl = require('./vimeoCtrl')


let corsOptions = {
    origin: 'http://localhost:3001'
}

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

app.get('/api/videos', vimeoCtrl.getVideos);
app.get('/api/videos/:id', vimeoCtrl.getVideoById);


app.listen(config.port, () => {
    console.log('listening on port 3001')
})

