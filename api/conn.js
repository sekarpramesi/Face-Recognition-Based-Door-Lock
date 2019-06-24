var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "es_api"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;