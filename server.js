const express = require('express');
const path = require('path');
const app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname+"/src"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/list', (req, res) => {
  res.redirect('localhost:3000/list');
});

app.get('/detail', (req, res) => {
  res.redirect('localhost:3000/detail');
});

app.listen(3000);
console.log("server started");
