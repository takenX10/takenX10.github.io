'use strict';
const express = require('express'),
app = express();
const multer = require("multer");
const jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var crypto = require('crypto');
const path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
const SECRETKEY = 'secret';
// testpsw
const PASSWORDHASH = 'd28f3b046c289ac7c1da0529e3e313988bf9cf51514ef469cc62411d52e208e0f133111bcb513feb0672936c1cb1f9e1726673faffc968d701543b7992cfdc53';


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

const handleError = (err, res) => {
  res.end(JSON.stringify({'value':'ERROR!'}));
};
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
  const data = fs.readFileSync('json/writeups.json', 'utf8');
  res.render('writeups', {content: escape(data)});
});

app.get('/writeup-viewer', (req, res) => {
  var json = fs.readFileSync('json/writeups.json', 'utf8');
  json = JSON.parse(json);
  var id = req.query.id;
  // TODO: check if the id is a valid id
  var data;
  json['writeups'].every(writeup =>{
    if(writeup['id'] === id){
      data = writeup;
      return false;
    }
    return true;
  });
  if(data === null){
    res.status(404).send("Not found.");
  }else{
    res.render('writeup-viewer', {content: escape(JSON.stringify(data))});
  }
});

app.get('/about-us', (req, res) => {
  const data = fs.readFileSync('json/members.json', 'utf8');
  res.render('about-us', {content: escape(data)});
});

// SrdnlenIsTheKing :)
app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/login', (req, res) =>{
  res.render('login');
});

app.post('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/login', (req, res) =>{
  var body = req.body;
  var username = body['username'];
  var password = body['password'];
  var hash = crypto.createHash('sha512');
  var hashedpsw = hash.update(password, 'utf-8');
  hashedpsw = hashedpsw.digest('hex');

  if(username === 'admin' && hashedpsw === PASSWORDHASH){
    var user = {
      'username':username,
      'password':password
    };
    jwt.sign({user:user}, SECRETKEY, (err,token)=>{
      res.cookie('authcookie',token, {maxAge:3600000, httpOnly:true});
      res.json({'status':'correct'});
    });
  }else{
    res.json({'status':'Error!'});
  }
});

function verify_jwt(req, res, next){
  if(req.headers['cookie'] !== null){
    var cookies = req.headers['cookie'].split(';');
    var token = '';
    cookies.forEach(element =>{
      try{
        element = element.split('=');
        if (element[0] == 'authcookie'){
          token = element[1];
        }
      }catch{
      }
    });
    if(token !== ''){
      jwt.verify(token, SECRETKEY, (err,data)=>{
        if(err){
          res.json({'status':'Forbidden!'});
        }else{
          next();
        }
      });
    }else{
      res.json({'status':'Forbidden!'});
    }
  }else{
    res.json({'status':'Forbidden!'});
  }
}

app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/manager', verify_jwt, (req, res) => {
  res.render('manager');
});

app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/members-manager',verify_jwt, (req, res) => {
  const data = fs.readFileSync('json/members.json', 'utf8');
  res.render('members-manager',{content: escape(data)});
});

app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/writeups-manager',verify_jwt, (req, res) => {
  const data = fs.readFileSync('json/writeups.json', 'utf8');
  res.render('writeups-manager',{content: escape(data)});
});

app.get('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/images-manager',verify_jwt, (req, res) => {
  var directoryPath = path.join(__dirname, 'public/img');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    var start = '{"images":[';
    var data = "";
    files.forEach(function (file) {
      data += ',{"Name":"'+file+'"}';
    });
    // per togliere la "," iniziale
    data = data.substring(1);
    start += data + "]}";
    res.render('images-manager',{content: escape(start)});
  });
  
});

app.post('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/add-manager',verify_jwt, (req, res) => {  
  var tipo = req.body['type'];
  delete req.body.type
  try{
    if(tipo == 'members'){
      const filecontent = fs.readFileSync('json/members.json', 'utf8');
      var final_json = JSON.parse(filecontent);
      final_json['members'].push(req.body);
      fs.writeFileSync('json/members.json', JSON.stringify(final_json));
    }else if(tipo == 'writeups'){
      const filecontent = fs.readFileSync('json/writeups.json', 'utf8');
      var final_json = JSON.parse(filecontent);
      req.body['id'] = crypto.createHash('sha256').update(req.body['Name']).digest('hex');
      console.log(req.body['id']);
      final_json['writeups'].push(req.body);
      fs.writeFileSync('json/writeups.json', JSON.stringify(final_json));
    }
    res.status(200).send(JSON.stringify({"value":"correct!"}));
  }catch(errorValue){
    res.status(500).send(JSON.stringify({"value":"ERROR!"}));
  }
});

app.post('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/img-upload',verify_jwt, upload.single("img"), (req, res, next) => {
  res.sendStatus(200);
});

app.post('/e390cd59e40e7dc601c9a8c1cde91417e6cc18bd950f8f061fff24b1b23b81b6/remove-manager',verify_jwt, (req, res) => {
  var tipo = req.body['type'];
  delete req.body.type
  try{
    if(tipo == 'members'){
      const filecontent = fs.readFileSync('json/members.json', 'utf8');
      var final_json = JSON.parse(filecontent);
      var lista = req.body['list'];
      var removelist = [];
      var i = 0;
      final_json['members'].forEach(elem =>{
        if(lista.includes(elem['Name'])){
          removelist.push(i);
        }
        i++;
      });
      var j = 0;
      removelist.forEach(i =>{
        final_json['members'].splice(i-j,1);
        j++;
      });
      fs.writeFileSync('json/members.json', JSON.stringify(final_json));
    }else if(tipo == 'writeups'){
      const filecontent = fs.readFileSync('json/writeups.json', 'utf8');
      var final_json = JSON.parse(filecontent);
      var lista = req.body['list'];
      var removelist = [];
      var i = 0;
      final_json['writeups'].forEach(elem =>{
        if(lista.includes(elem['Name'])){
          removelist.push(i);
        }
        i++;
      });
      var j = 0;
      removelist.forEach(i =>{
        final_json['writeups'].splice(i-j,1);
        j++;
      });
      fs.writeFileSync('json/writeups.json', JSON.stringify(final_json));
    }else if(tipo == 'images'){
      var lista_immagini = req.body['list'];
      lista_immagini.forEach(imgname => {
        fs.unlinkSync('public/img/'+imgname);
      });
    }
    res.status(200).send(JSON.stringify({"value":"correct!"}));
  }catch(errorValue){
    res.status(500).send(JSON.stringify({"value":"ERROR!"}));
  }
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