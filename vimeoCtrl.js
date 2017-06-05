const vimeo_module = require('./lib/vimeo'),
    Vimeo = vimeo_module.Vimeo,
    config = require('./config'),
    axios = require('axios'),
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET, config.access_token),
    redirect_url = `http://localhost:${config.port}`;

module.exports = {
    getVideos: (req, res) => {
        let makeRequest = lib => {
            return lib.request({
                path: `/videos`,
                query: {
                    page: req.params.pageNum,
                    per_page: 12,
                    query: `${req.query.search}`,
                    sort: 'relevant',
                    direction: 'asc'
                },
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    getComments: (req, res) => {
        let makeRequest = lib => {
            return lib.request({
                path: `/videos/${req.params.id}/comments`,
                query: {
                    per_page: 10,
                    direction: 'asc'
                }
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
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
            return lib.request({
                path: `/videos/${req.query.id}`,
                query: {
                    per_page: 10
                }
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    getVideoByChannels: (req, res) => {
        let makeRequest = function (lib) {
            return lib.request({
                path: `/channels/${req.params.channel}/videos`,
                query: {
                    per_page: 10
                }
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    uploadVid: (req, res) => {
        var file_path = req.body.video;
        var prev_percentage = -1;

        lib.access_token = config.access_token;
        lib.streamingUpload(file_path,
            function (err, body, status, headers) {
                if (err) {
                    return console.log(err);
                }
                console.log(status);
                console.log(headers.location);
            },
            function (uploaded_size, file_size) {
                var percentage = Math.round((uploaded_size / file_size) * 100);

                if (percentage != prev_percentage) {
                    console.log(percentage + '%' + ' uploaded\n');
                    prev_percentage = percentage;
                }
            })
    }
}
