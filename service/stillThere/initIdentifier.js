import { mysqld } from "../../database/mysql.js";
import chalk from "chalk";

const initIdentifier = async(data) => {
    try {
        mysqld.query(
            `SELECT identifier FROM identifier WHERE EXISTS (SELECT identifier FROM identifier WHERE identifier = "${data.attributes.identifier}");`,
            function(error, results, fields) {
                if (error) throw error;
                if (results.length == 0) {
                    mysqld.query(
                        `INSERT INTO big.identifier (identifier) VALUES ("${data.attributes.identifier}");`,
                        function(error, results, fields) {
                            if (error) throw error;
                            console.log(chalk.green(chalk.bold(`${data.attributes.identifier} add`)))
                        }
                    );
                }
            }
        );
    } catch (e) {

    }
}

export default initIdentifier;