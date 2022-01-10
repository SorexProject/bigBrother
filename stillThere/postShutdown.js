import { Options, userHeaders, debug } from "../index.js";
import { mysqld } from "./mysql.js";
import { body } from "./stillThere.js";
import axios from "axios";

let aujourdhui = new Date();

async function postShutdown() {
    try {

        for (let datas of body) {
            for (let data of datas.data.data) {
                if (data.attributes.egg == 15 && data.attributes.suspended == false && data.attributes.container.installed == 1) {
                    mysqld.query(
                        `SELECT identifier FROM identifier WHERE EXISTS (SELECT identifier FROM identifier WHERE identifier = "${data.attributes.identifier}");`,
                        function(error, results, fields) {
                            if (error) throw error;
                            console.log(results)
                        }
                    );
                }
            }

        }

    } catch (error) {}
}
export { postShutdown };