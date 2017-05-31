"use strict";
const vimeo_module = require('./lib/vimeo'),
    app = require('./server'),
    config = require('./config'),
    massive = require('massive'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    base64 = require('base-64').encode,
    axios = require('axios'),
    Vimeo = vimeo_module.Vimeo,
    state = 'test',
    redirect_uri = config.redirect_uri,
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET),
    scopes = ['public', 'private', 'purchased', 'create', 'edit', 'delete', 'interact', 'upload'],
    url = lib.buildAuthorizationEndpoint(redirect_uri, scopes, state),
    url2 = `https://api.vimeo.com/oauth/authorize?client_id=${config.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&state=${state}`;


app.set('db', massiveInstance);
let db = app.get('db');

module.exports = {

    login: (req, res) => {
        res.send(url);
    },
    callback: (req, res) => {
        axios({
            method: 'post',
            url: 'https://api.vimeo.com/oauth/access_token',
            data: {
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: redirect_uri
            },
            headers: {Authorization: "basic " + base64(config.CLIENT_ID + ":" + config.CLIENT_SECRET)}
        }).then(response => {
            req.session.user = response.data.user;
            let usersName = req.session.user.name;
            db.add_user([usersName], (err, result) => {
                err ? console.log(err) : console.log(result);
            })
            req.session.access_token = response.data.access_token;
            res.redirect(`http://localhost:${config.port}`);
        }).catch(error => {
            console.log(error);
        });
    },
    getUser: (req, res) => {
        axios({
            method: 'get',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me?fields=uri,name'
        }).then(response => {
            res.status(200).json(req.session.user);
        }).catch(error => {
            res.status(401).send('not signed in');
        });
    },
    uploadVideo: (req, response) => {
        axios({
            method: 'post',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me/videos',
            data:{
                type: 'streaming'
            }

        }).then(resp => {
            let link = resp.data.upload_link_secure;
            let ticket_id = resp.data.ticket_id;
            console.log(resp);
            // axios({
            //     method: 'put',
            //     headers: {
            //         "Content-Length": 339108,
            //         "Content-Type": "video/mp4"
            //     },
            //     url: `${link}/upload?ticket_id=${ticket_id}`,
            // }).then(res => {
            //     // req.session.data = res.data.complete_uri;
            //     console.log(res);
                // axios({
                //     method: 'delete',
                //     url: `https://api.vimeo.com/${req.session.data}`
                // }).then(res1 => {
                //     console.log(res1);
                // })
                // response.status(200).send(res.data.ticket_id);
            }).catch(error => {
                console.log(error);
            });
        // });


    },
    usersVideos: (req, response) => {
        axios({
            method: 'get',
            url: 'https://api.vimeo.com/me/videos',
            headers: {Authorization: `Bearer ${req.session.access_token}`}
        }).then(res => {
            response.status(200).send(res.data);
        }).catch(error => {
            console.log(error);
        });
    },
}
