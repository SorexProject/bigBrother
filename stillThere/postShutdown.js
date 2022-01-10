import { power } from "./power.js";
import { mysqld } from "./mysql.js";

async function postShutdown(identifier) {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {
                    if (res.time > 180) {
                        const players = power(identifier, "kill");
                        console.log(players)
                    }
                }
            }
        );

    } catch (error) {}
}
export { postShutdown };