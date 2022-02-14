import { power } from "../../request/pterodactyl/user/power.js";
import { mysqld } from "../../database/mysql.js";
import deleteIdentifier from "./deleteIdentifier.js";
import chalk from "chalk";

const postShutdown = async(data) => {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${data.attributes.identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {
                    if (res.time > 60) {
                        power(data.attributes.identifier, "kill");
                        deleteIdentifier(data)
                        console.log(chalk.yellow(chalk.bold(`${data.attributes.identifier} killed`)))
                        return
                    }
                }
            }
        );
        return
    } catch (e) {}
}
export default postShutdown;