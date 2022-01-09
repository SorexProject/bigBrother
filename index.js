import { getResource } from "./element/getResource.js";
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
                    mysqld.query(
                        `SELECT identifier FROM identifier WHERE EXISTS (SELECT identifier FROM identifier WHERE identifier = "${data.attributes.identifier}");`,
                        function(error, results, fields) {
                            if (error) throw error;
                            if (results.length == 0) {
                                mysqld.query(
                                    `INSERT INTO big.identifier (identifier) VALUES ("${data.attributes.identifier}");`,
                                    function(error, results, fields) {
                                        if (error) throw error;
                                        console.log(results);
                                    }
                                );
                            } else if (resource.data.maxPlayers > 0) {
                                mysqld.query(
                                    "SELECT 1 + 1 AS solution",
                                    function(error, results, fields) {
                                        if (error) throw error;
                                        console.log("results");
                                    }
                                );
                            }
                        }
                    );
                    console.log(resource);
                    if (resource.data.maxPlayers > 0) {
                        // mysqld.query(
                        //     "SELECT 1 + 1 AS solution",
                        //     function(error, results, fields) {
                        //         if (error) throw error;
                        //         console.log("The solution is: ", results[0].solution);
                        //     }
                        // );
                    }
                }
            }
        }
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}
export { Options, userHeaders, debug };