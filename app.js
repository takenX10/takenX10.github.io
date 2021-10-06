'use strict';
const express = require('express'),
app = express();

const fs = require('fs')

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// Test ports
const PORT = 5000;
const HOST = '0.0.0.0';
// App
app.get('/', (req, res) => {
  res.redirect('index');
});

app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/writeups', (req, res) => {
  res.render('writeups');
});

app.get('/about-us', (req, res) => {
    res.render('about-us');
});

app.get('/writeup-1', (req, res) => {
  const data = fs.readFileSync('json/writeup.json', 'utf8');

  res.render('writeup', {content: escape(data)});
});

app.get('*', (req, res) => {
  res.status(404).send("Not found.");
})

app.listen(PORT, HOST);
console.log(" ________________");
console.log("|                | ");
console.log(`|  IP: ${HOST}   |`);
console.log(`|   PORT: ${PORT}   |`);
console.log("|＿＿＿＿＿＿＿＿|");
console.log("(\\\__/) ||");
console.log("(•ㅅ•) ||");
console.log("/ 　 づ");