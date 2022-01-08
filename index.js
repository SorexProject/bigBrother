var app = require("express")();
var server = require("http").Server(app);
const axios = require("axios");
require("dotenv").config();

const debug = true;

let aujourdhui = new Date();

server.listen(30001);

app.get('/', function(req, res) {
    res.send('Ready');
});

const unsplashHeaders = {
    Authorization: `Client-ID lr1nfucxHIsRAIoIDZqJQTYGIeOjAEFO1jlQ8OoFdOw`,
};

const unsplashOptions = {
    baseURL: "https://api.unsplash.com",
    port: 443,
    url: "",
    method: "",
    headers: unsplashHeaders,
};

app.get(`/api/image/Random`, async(req, res) => {
    try {
        unsplashOptions.method = "get";
        unsplashOptions.url = `/photos/random`;

        const result = await axios(unsplashOptions);
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${unsplashOptions.url} ${result.status}`);
            }
        }

        if (result) {
            return res.send(result.data);
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${unsplashOptions.url} : ${error}`);
        return res.send(error);
    }
});