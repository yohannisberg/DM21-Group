const vimeo_module = require('./lib/vimeo'),
    Vimeo = vimeo_module.Vimeo,
    config = require('./config'),
    axios = require('axios'),
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET, config.access_token);


module.exports = {

    getVideos: (req, res) => {
        let makeRequest = function (lib) {
            return lib.request({
                path: `/videos?query=${req.query.search}`,
                query: {
                    per_page: 10
                }
            }, function (error, body, status_code, headers) {
                if (error) {
                    console.log(error);
                } else {
                    return res.status(200).send(body);
                }
            })

        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {

            lib.generateClientCredentials('public', function (err, access_token) {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);

            });
        }

    },
    getVideoById: (req, res) => {
        let makeRequest = function (lib) {
            console.log(req.params);

            return lib.request({
                path: `/videos/${req.params.id}`,
                query: {
                    per_page: 10
                }
            }, function (error, body, status_code, headers) {
                if (error) {
                    console.log('error');
                    console.log(error);
                } else {
                    console.log('body');
                    console.log(body);
                    return res.status(200).send(body);
                }
                console.log('status code');
                console.log(status_code);
                console.log('headers');
                console.log(headers);
            })

        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            // Unauthenticated api requests must request an access token. You should not request a new access token for each request, you should request an access token once and use it over and over.
            lib.generateClientCredentials('public', function (err, access_token) {
                if (err) {
                    res.status(404).send(err);
                }
                // Assign the access token to the library
                lib.access_token = access_token.access_token;
                makeRequest(lib);

            });
        }




        // var file_path = process.argv[2];
        // var prev_percentage = -1;
        // lib.access_token = config.access_token;
        // lib.streamingUpload(file_path,
        //     function (err, body, status, headers) {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         console.log(status);
        //         console.log(headers.location);
        //     },
        //     function (uploaded_size, file_size) {
        //         var percentage = Math.round((uploaded_size/file_size) * 100);
        //
        //         if (percentage != prev_percentage) {
        //             console.log(percentage + '%' + ' uploaded\n');
        //             prev_percentage = percentage;
        //         }
        //     }
        // );
    },
    getComments: (req, res) => {
        let makeRequest = function (lib) {
            console.log(req.params);

            return lib.request({
                path: `/videos/${req.params.id}/comments`,
                query: {
                    per_page: 10
                }
            }, function (error, body, status_code, headers) {
                if (error) {
                    console.log('error');
                    console.log(error);
                } else {
                    console.log('body');
                    console.log(body);
                    return res.status(200).send(body);
                }
                console.log('status code');
                console.log(status_code);
                console.log('headers');
                console.log(headers);
            })

        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            // Unauthenticated api requests must request an access token. You should not request a new access token for each request, you should request an access token once and use it over and over.
            lib.generateClientCredentials('public', function (err, access_token) {
                if (err) {
                    res.status(404).send(err);
                }
                // Assign the access token to the library
                lib.access_token = access_token.access_token;
                makeRequest(lib);

            });
        }
    },

    addComents: (req, res) => {
        let makeRequest = function (lib) {
            console.log(req.params);

            return lib.request({
                path: `/videos/${req.params.id}/comments`,
                query: {
                    per_page: 1
                }
            }, function (error, body, status_code, headers) {
                if (error) {
                    console.log('error');
                    console.log(error);
                } else {
                    console.log('body');
                    console.log(body);
                    return res.status(200).send(body);
                }
                console.log('status code');
                console.log(status_code);
                console.log('headers');
                console.log(headers);
            })

        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            // Unauthenticated api requests must request an access token. You should not request a new access token for each request, you should request an access token once and use it over and over.
            lib.generateClientCredentials('public', function (err, access_token) {
                if (err) {
                    res.status(404).send(err);
                }
                // Assign the access token to the library
                lib.access_token = access_token.access_token;
                makeRequest(lib);

            });
        }
    },

    makeRequest: (req, res) => {

        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            // Unauthenticated api requests must request an access token. You should not request a new access token for each request, you should request an access token once and use it over and over.
            lib.generateClientCredentials('public', function (err, access_token) {
                if (err) {
                    res.status(404).send(err);
                }
                // Assign the access token to the library
                lib.access_token = access_token.access_token;
                makeRequest(lib);

            });
        }


        function makeRequest(lib) {
            if (req.params.category === 'comedy') {
                return lib.request({
                    // This is the path for the videos contained within the staff picks channels
                    path: `/videos/staffpicks/videos`,
                    query: {
                        per_page: 10
                    }
                }, function (error, body, status_code, headers) {
                    if (error) {
                        console.log('error');
                        console.log(error);
                    } else {
                        console.log('body');
                        console.log(body);
                        return res.status(200).send(body);
                    }
                    console.log('status code');
                    console.log(status_code);
                    console.log('headers');
                    console.log(headers);
                });
            }
        }
    }
}
