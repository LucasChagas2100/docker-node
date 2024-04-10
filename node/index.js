const express = require('express')
const http = require('http');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

// Definindo uma lista de nomes para inserção
connection.query(`CREATE TABLE IF NOT EXISTS people (name varchar(255))`)
connection.query(`ALTER TABLE people AUTO_INCREMENT = 1`)

connection.query(`INSERT INTO people (name) values ('Lucas')`)
connection.query(`INSERT INTO people (name) values ('Mateus')`)
connection.query(`INSERT INTO people (name) values ('Sueli')`)
connection.query(`INSERT INTO people (name) values ('Carol')`)

const sql = `SELECT * FROM people`;
var people


connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
  
    people = "<ol>";
    Object.keys(results).forEach(function(key) {
      var row = results[key];
      people = people + "<li>" + row.name + "</li>"
    });
    people = people + "</ol>";
});
  
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('\
    <h1>Full Cycle Rocks!</h1> \
    <hr> \
    <h2>People</h2> \
    ' + people + ' \
    ');
    console.log(people);
});
  
connection.end()

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
});