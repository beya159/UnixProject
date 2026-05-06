const mysql = require("mysql");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "YOUR_PASSWORD",
    database: "campusconfess"
});

db.connect(function(err) {
    if (err) {
        console.log("FAILED:", err.message);
    } else {
        console.log("CONNECTED SUCCESSFULLY");
    }
});