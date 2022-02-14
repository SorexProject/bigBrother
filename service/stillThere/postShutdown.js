import { power } from "../../request/pterodactyl/user/power.js";
import { mysqld } from "../../database/mysql.js";
import chalk from "chalk";

async function postShutdown(identifier) {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {
                    if (res.time > 60) {
                        const players = power(identifier, "kill");
                        console.log(chalk.yellow(chalk.bold(`${identifier} killed`)))
                        return
                    }
                }
            }
        );
        return
    } catch (e) {}
}
export default postShutdown;