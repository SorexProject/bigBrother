import { Options, userHeaders, debug } from "../index.js";
import { mysqld } from "./mysql.js";
import axios from "axios";

let aujourdhui = new Date();

async function postShutdown() {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${data.attributes.identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {

                }
            }
        );

    } catch (error) {}
}
export { postShutdown };