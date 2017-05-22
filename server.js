const express = require('express'),
    config = require('./config.js'),
    massive = require('massive'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express();

let corsOptions = {
    origin: 'http://localhost:3001'
}

app.use(bodyParser.json());
app.use(cors(corsOptions));



app.listen(config.port, () => {
    console.log('listening on port 3001')
})

