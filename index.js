var app = require("express")();
var server = require("http").Server(app);
const axios = require("axios");
require("dotenv").config();

const debug = true;
let aujourdhui = new Date();
const hostname = process.env.SERVER_PTERODACTYL_URL;
const tokenUser = process.env.SERVER_PTERODACTYL_TOKENUSER;
const tokenServer = process.env.SERVER_PTERODACTYL_TOKENSERVER;

server.listen(30001);

app.get("/", function(req, res) {
    res.send("Ready");
});

const serverHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenUser}`,
};

const serverOptions = {
    baseURL: hostname,
    port: 443,
    url: "",
    method: "",
    headers: serverHeaders,
};

var intervalID = setInterval(alreadyup, 500, "Parameter 1", "Parameter 2");

async function alreadyup() {}

app.get(`/api/image/Random`, async(req, res) => {
    try {
        serverOptions.method = "get";
        serverOptions.url = `/photos/random`;

        const result = await axios(serverOptions);
        if (result) {
            if (debug === true) {
                console.log(
                    `${aujourdhui} : route ${serverOptions.url} ${result.status}`
                );
            }
        }

        if (result) {
            return res.send(result.data);
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${serverOptions.url} : ${error}`);
        return res.send(error);
    }
});