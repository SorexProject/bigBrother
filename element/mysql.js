import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();


const mysqld = mysql.createConnection({
    host: "192.168.1.201",
    user: "big",
    password: "P6WOqeBaB8RERIt5m621sE5aR2VuD2",
    database: "big",
});

mysqld.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + mysqld.threadId);
});

mysqld.query(
    "CREATE TABLE IF NOT EXISTS `identifier` (`identifier` TEXT NOT NULL,`time` decimal(30,0) NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    function(error, results, fields) {
        if (error) throw error;
        console.log("Database init");
    }
);
export { mysqld }