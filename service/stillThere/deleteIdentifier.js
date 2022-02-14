import mysqld from "../../database/mysql.js";
import chalk from "chalk";

const deleteIdentifier = async(data) => {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${data.attributes.identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {
                    mysqld.query(
                        `DELETE FROM big.identifier WHERE identifier='${data.attributes.identifier}' AND time=${res.time} LIMIT 1;`,
                        function(error, results, fields) {
                            if (error) throw error;
                            console.log(chalk.red(chalk.bold(`${data.attributes.identifier} delete`)))
                        }
                    );
                }
            }
        );
    } catch (e) {
        console.error(e)
    }
}

export default deleteIdentifier;