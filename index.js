// import { getResource } from "./element/getResource.ts";
import express from "express";
const app = express();
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import http from "http";

const debug = true;
let aujourdhui = new Date();
const hostname = process.env.SERVER_PTERODACTYL_URL;
const tokenUser = process.env.SERVER_PTERODACTYL_TOKENUSER;
const tokenServer = process.env.SERVER_PTERODACTYL_TOKENSERVER;
const port = process.env.SERVER_PORT;

http.createServer(app).listen(port);
console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

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
    headers: null,
};

var intervalID = setInterval(alreadyup, 10000);

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
                if (data.attributes.egg == 15) {
                    const resource = await getResource(data.attributes.identifier);
                }
            }
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}
// export { userHeaders, debug };