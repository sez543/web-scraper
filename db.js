var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
con.query("SELECT DATABASE Books", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

con.query(
  "CREATE TABLE stores (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), street VARCHAR(255), owner INT, freeShipping BOOL)",
  function (err, result) {
    if (err) throw err;
    console.log("Table stores created");
  }
);

con.query(
  "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))",
  function (err, result) {
    if (err) throw err;
    console.log("Table users created");
  }
);
