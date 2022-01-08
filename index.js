var app = require("express")();
var server = require("http").Server(app);
const axios = require("axios");
require("dotenv").config();

const debug = true;
let aujourdhui = new Date();
const hostname = process.env.SERVER_PTERODACTYL_URL;
const tokenUser = process.env.SERVER_PTERODACTYL_TOKENUSER;
const tokenServer = process.env.SERVER_PTERODACTYL_TOKENSERVER;

server.listen(process.env.SERVER_PORT);

app.get("/", function(req, res) {
    res.send("Ready");
});

const userHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenUser}`,
};
const serverHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenServer}`,
};

const Options = {
    baseURL: hostname,
    port: 443,
    url: "",
    method: "",
};

var intervalID = setInterval(alreadyup, 10000);

async function getResource(identifier) {
    try {
        Options.method = "get";
        Options.url = `/api/client/servers/${identifier}/resources`;
        Options.headers = userHeaders;
        const result = await axios(Options);
        // debug mode
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${Options.url} ${result.status}`);
            }
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}
async function alreadyup() {
    try {
        let body = [];
        Options.method = "get";
        Options.url = `/api/application/servers`;
        Options.headers = serverHeaders;

        const result = await axios(Options);
        // debug mode
        if (result) {
            if (debug === true) {
                console.log(`${aujourdhui} : route ${Options.url} ${result.status}`);
            }
        }

        if (result) {
            for (let data of result.data.data) {
                body.push(data.attributes);
                const diskinit = await getResource(data.attributes.identifier);
            }
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}