import { Options, serverHeaders, debug } from "../index.js";
import { postShutdown } from "./postShutdown.js";
import { getPlayers } from "../pterodactyl/getPlayers.js";
import { mysqld } from "../database/mysql.js";
import axios from "axios";


async function stillThere() {
    try {
        let aujourdhui = new Date();

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
                if (data.attributes.egg == 15 && data.attributes.suspended == false && data.attributes.container.installed == 1) {
                    const players = await getPlayers(data.attributes.identifier);
                    if (players.data.onlinePlayers == 0 && players.data.show == 1) {
                        mysqld.query(
                            `SELECT identifier FROM identifier WHERE EXISTS (SELECT identifier FROM identifier WHERE identifier = "${data.attributes.identifier}");`,
                            function(error, results, fields) {
                                if (error) throw error;
                                if (results.length == 0) {
                                    mysqld.query(
                                        `INSERT INTO big.identifier (identifier) VALUES ("${data.attributes.identifier}");`,
                                        function(error, results, fields) {
                                            if (error) throw error;
                                        }
                                    );
                                } else if (players.data.onlinePlayers == 0) {
                                    mysqld.query(
                                        `SELECT * FROM identifier WHERE identifier="${data.attributes.identifier}"`,
                                        function(error, results, fields) {
                                            if (error) throw error;
                                            for (let res of results) {
                                                mysqld.query(
                                                    `UPDATE big.identifier SET time='${res.time + 1}' WHERE  identifier='${data.attributes.identifier}' AND time=${res.time} LIMIT 1;`,
                                                    function(error, results, fields) {
                                                        if (error) throw error;
                                                    }
                                                );

                                            }
                                            const players = postShutdown(data.attributes.identifier);
                                        }
                                    );
                                }
                            }

                        );
                    } else {
                        mysqld.query(
                            `SELECT * FROM identifier WHERE identifier="${data.attributes.identifier}"`,
                            function(error, results, fields) {
                                if (error) throw error;
                                for (let res of results) {
                                    mysqld.query(
                                        `DELETE FROM big.identifier WHERE identifier='${data.attributes.identifier}' AND time=${res.time} LIMIT 1;`,
                                        function(error, results, fields) {
                                            if (error) throw error;
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            }
        }
        return;
    } catch (error) {
        console.log(`${aujourdhui} : route ${Options.url} : ${error}`);
        return;
    }
}
export { stillThere };