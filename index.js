import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import http from "http";

import stillThere from "./service/stillThere/index.js";
import setCpu from "./service/setCpu/index.js";

const port = process.env.SERVER_PORT;

http.createServer(app).listen(port);
console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

app.get("/", function(req, res) {
    res.send("Ready");
});

setInterval(stillThere, 30000);
setInterval(setCpu, 60000);