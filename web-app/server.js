const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "db",
    user: "root",
    password: "secretpassword",
    database: "campusconfess"
});

db.connect(function(err) {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Connected to MySQL");
    }
});

// to save confessions
app.post("/confessions", function(req, res) {
    const content = req.body.content;

    const sql = "INSERT INTO confessions (content) VALUES (?)";

    db.query(sql, [content], function(err, result) {
        if (err) throw err;
        res.send("Confession saved");
    });
});

//to get confessions
app.get("/confessions", function(req, res) {
    const sql = "SELECT * FROM confessions ORDER BY created_at DESC";

    db.query(sql, function(err, results) {
        if (err) throw err;
        res.json(results);
    });
});

// start the server
app.listen(3000, function() {
    console.log("Server running on port 3000");
});
