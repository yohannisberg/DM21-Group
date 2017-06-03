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
let redirectUrl = `http://localhost:${config.port}`;

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
            console.log(req.session.dude);
            let usersName = req.session.user.name;
            db.delete_all_users((err, result) => {
                err ? console.log(err) : console.log(result);
            });
            db.add_user([usersName], (err, result) => {
                err ? console.log(err) : console.log(result);
            })
            req.session.access_token = response.data.access_token;
            res.redirect(redirectUrl);
        }).catch(error => {
            console.log(error);
        });
    },
    logout: (req, res) => {
        console.log('logging out');
        req.session.destroy();
        res.redirect(redirectUrl);
    },
    getUser: (req, res) => {
        axios({
            method: 'get',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me?fields=uri,name'
        }).then(response => {
            res.status(200).json(req.session.user);
        }).catch(error => {
            res.status(401).send('Not signed in')
            console.log(error);
        });
    },
    getAccessToken: (req, res) => {
        axios({
            method: 'get',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me'
        }).then(response => {
            res.status(200).json(req.session);
        }).catch(error => {
            console.log(error);
        });
    },
    uploadVideo: (req, response) => {
        axios({
            method: 'get',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me/videos',
            data: {
                type: 'POST',
                redirect_url: `http://localhost:${config.port}`
            }
        }).then(resp => {
            response.send(resp.data);
            // axios({
            //     method: 'delete',
            //     url: `https://api.vimeo.com/${req.session.data}`
            // }).then(res1 => {
            //     console.log(res1);
            // })
            // response.status(200).send(res.data.ticket_id);
            // }).catch(error => {
            //     console.log(error);
            // });
        })
        // axios({
        //     method: 'post',
        //     headers: {Authorization: `Bearer ${req.session.access_token}`},
        //     data: req.body.video,
        //     url: `${req.session.link}`,
        // }).then(res => {
        //     // req.session.data = res.data.complete_uri;
        //     console.log(req.session.link);
        // })
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
    addComments: (req, res) => {
        axios({
            method: 'post',
            url: `https://api.vimeo.com/videos/${req.params.id}/comments`,
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            data: {
                text: req.body.text
            }
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error);
        });
    },
    watchLater: (req, res) => {
        db.add_video([req.body.video, req.params.id], (err, video) => {
            !err ? res.status(200).send(video) : res.status(404).send(err);
        })
    },
    displayWatchLater: (req, res) => {
        db.get_videos((err, video) => {
            !err ? res.status(200).send(video) : res.status(404).send(err);
        })
    }
}
