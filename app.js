'use strict';
const express = require('express'),
app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
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
// SrdnlenIsTheKing :)
app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/manager', (req, res) => {
  res.render('manager');
});

app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/members-manager', (req, res) => {
  res.render('members-manager');
});

app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/writeups-manager', (req, res) => {
  res.render('writeups-manager');
});

app.post('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/add-manager', (req, res) => {
  var tipo = req.body['type'];
  delete req.body.type
  res.setHeader('Content-Type', 'application/json');
  try{
    if(tipo == 'members'){
      const filecontent = fs.readFileSync('json/members.json', 'utf8');
      var final_json = JSON.parse(filecontent);
      final_json['members'].push(req.body);
      fs.writeFileSync('json/members.json', JSON.stringify(final_json));
      console.log(final_json);
    }else if(tipo == 'writeup'){
      const filecontent = fs.readFileSync('json/writeups.json', 'utf8');
      var final_json = JSON.parse(filecontent);
      final_json['writeups'].push(req.body);
      fs.writeFileSync('json/writeups.json', JSON.stringify(final_json));
    }
    res.end(JSON.stringify({'value':'correct!'}));
  }catch(errorValue){
    res.end(JSON.stringify({'value':'ERROR!'}));
  }
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