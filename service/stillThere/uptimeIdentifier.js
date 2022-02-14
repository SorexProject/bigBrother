import mysqld from "../../database/mysql.js";
import chalk from "chalk";

const uptimeIdentifier = async(data) => {
    try {
        mysqld.query(
            `SELECT * FROM identifier WHERE identifier="${data.attributes.identifier}"`,
            function(error, results, fields) {
                if (error) throw error;
                for (let res of results) {
                    mysqld.query(
                        `UPDATE big.identifier SET time='${res.time + 1}' WHERE  identifier='${data.attributes.identifier}' AND time=${res.time} LIMIT 1;`,
                        function(error, results, fields) {
                            if (error) throw error;
                            let uptime = res.time / 2
                            console.log(chalk.blue(chalk.bold(`${data.attributes.identifier} started ${uptime} min`)))
                        }
                    );
                }
            }
        );
    } catch (e) {
        console.error(e)
    }
}

export default uptimeIdentifier;