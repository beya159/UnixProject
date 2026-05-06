const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: "db",
    user: "root",
    password: "secretpassword",
    database: "campusconfess"
};

let db;

//db.connect(function(err) {
    //if (err) {
        //console.log("Database connection failed");
    //} else {
        //console.log("Connected to MySQL");
    //}
//});

function handleDisconnect(){
    db = mysql.createConnection(dbConfig);

    db.connect(function(err){
        if(err){
            console.log("Database connection failed. Error Code:", err.code);
            setTimeout(handleDisconnect, 5000); // wait 5 seconds and try agin
        } else{
            console.log("Connected to MySQL successfully");
        }
    });

    db.on('error', function (err){
        console.log('Database error:', err.code);
        if (err.code == 'PROTOCOL_CONNECTION_LOST' || err.code == 'ECONNREFUSED'){
            handleDisconnect();
        } else {
            console.error("Critical DB error:", err);
        }
    });
}

handleDisconnect();

// to save confessions
app.post("/confessions", function(req, res) {
    const content = req.body.content;

    const sql = "INSERT INTO confessions (content) VALUES (?)";

    db.query(sql, [content], function(err, result) {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).send("Error saving data");
        }
        res.send("Confession saved");
    });
});

//to get confessions
app.get("/confessions", function(req, res) {
    const sql = "SELECT * FROM confessions ORDER BY created_at DESC";

    db.query(sql, function(err, results) {
        if (err) {
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
});

// start the server
app.listen(3000, function() {
    console.log("Server running on port 3000");
});
