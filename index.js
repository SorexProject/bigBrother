import { stillThere } from "./stillThere/stillThere.js";
import express from "express";
const app = express();
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
    data: null,

};

const interval = 10000
var intervalStillThere = setInterval(stillThere, interval);


export { Options, userHeaders, debug, serverHeaders };