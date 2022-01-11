import { power } from "../pterodactyl/power.js";
import { mysqld } from "../database/mysql.js";

async function postShutdown(identifier) {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {
                    if (res.time > 90) {
                        const players = power(identifier, "kill");
                        return
                    }
                }
            }
        );
        return
    } catch (error) {}
}
export { postShutdown };