import mysql from "mysql";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();


const mysqld = mysql.createConnection({
    host: process.env.SERVER_MYSQL_HOST,
    user: process.env.SERVER_MYSQL_USER,
    password: process.env.SERVER_MYSQL_PWD,
    database: process.env.SERVER_MYSQL_DATABASE,
});

mysqld.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log(chalk.green("connected as id " + chalk.bold(mysqld.threadId)));
});
// init table
mysqld.query(
    "CREATE TABLE IF NOT EXISTS `identifier` (`identifier` TEXT NOT NULL,`time` decimal(30,0) NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    function(error, results, fields) {
        if (error) throw error;
        console.log(chalk.green(chalk.bold("Database init")));
    }
);
export default mysqld