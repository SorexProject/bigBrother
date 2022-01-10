import { getPlayers } from "./element/getPlayers.js";
import { stillThere } from "./element/stillThere.js";
import express from "express";
const app = express();
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import mysql from "mysql";


const debug = true;
let aujourdhui = new Date();
const hostname = process.env.SERVER_PTERODACTYL_URL;
const tokenUser = process.env.SERVER_PTERODACTYL_TOKENUSER;
const tokenServer = process.env.SERVER_PTERODACTYL_TOKENSERVER;
const port = process.env.SERVER_PORT;

const mysqld = mysql.createConnection({
    host: "192.168.1.201",
    user: "big",
    password: "P6WOqeBaB8RERIt5m621sE5aR2VuD2",
    database: "big",
});
mysqld.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + mysqld.threadId);
});

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
mysqld.query(
    "CREATE TABLE IF NOT EXISTS `identifier` (`identifier` TEXT NOT NULL,`time` decimal(30,0) NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    function(error, results, fields) {
        if (error) throw error;
        console.log("Database init");
    }
);

var intervalID = setInterval(stillThere, 10000);


export { Options, userHeaders, debug, serverHeaders };