"use strict";
const vimeo_module = require('./lib/vimeo'),
    Vimeo = vimeo_module.Vimeo,
    config = require('./config'),
    state = 'test',
    axios = require('axios'),
    redirect_uri = config.redirect_uri,
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET, config.access_token),
    scopes = ['public', 'private', 'edit', 'interact'],
    url = lib.buildAuthorizationEndpoint(redirect_uri, scopes, state),
    base64 = require('base-64').encode;

console.log(base64);

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
                redirect_uri: redirect_uri,
            },
            headers: {Authorization : "basic " + base64(config.CLIENT_ID + ":" + config.CLIENT_SECRET)}
        }).then(function(response) {
            // console.log('response:\n\n',response);
            res.redirect('http://localhost:3001');

        }).catch(function (error) {
                 console.log('error:\n\n', error);
            });
    }
}

//axios.post('http://localhost:3001/auth/callback?test=hi',{grant_type:'test',code:'boo'})


// var context = require('repl').start({}).context;
//
// /**
//  * This will upload the video to the authenticated account.
//  *
//  * @param  {string} path The path to the video file
//  * @param  {string} video_uri Optional. If provided, this upload will replace the source file of the video uri provided
//  */
// context.upload = function (path, video_uri) {
//     lib.streamingUpload(path, video_uri, function (err, data, status, headers) {
//         if (err) {
//             console.log('---upload error---');
//             console.log('error');
//             console.log(err);
//             console.log('response body');
//             console.log(data);
//             console.log('response status');
//             console.log(status);
//             console.log('response headers');
//             console.log(headers);
//         } else {
//             console.log('---upload success---');
//             console.log('response body');
//             console.log(data);
//             console.log('response status');
//             console.log(status);
//             console.log('response headers');
//             console.log(headers);
//         }
//     });
// };
//
// /**
//  * This method lets you make api requests.
//  *
//  * options.method is a string of the HTTP method for the request (GET, POST, PUT, PATCH, DELETE)
//  * options.path is a string of the path portion of a url (eg. /users/dashron)
//  * options.query is an object containing all of your request parameters. If GET they will be appended to the url, if POST it will be part of your request body
//  * options.headers is an object containing key value pairings of all of the HTTP request headers
//  *
//  * @param  {Object|String} options If string, it will make a GET request to that url. If an object, you can provide many parameters. See the function description for more.
//  */
// context.request = function (options) {
//     if (typeof options === "string") {
//         options = {path: options};
//     }
//
//     lib.request(options, function (err, data, status, headers) {
//         if (err) {
//             console.log('---request error---');
//             console.log('status');
//             console.log(status);
//             console.log('headers');
//             console.log(headers);
//
//             console.log('error');
//             console.log(util_module.inspect(err));
//         } else {
//             console.log('---request success---');
//             console.log('status');
//             console.log(status);
//             console.log('headers');
//             console.log(headers);
//
//             console.log('response');
//             console.log(data);
//         }
//     });
// };
