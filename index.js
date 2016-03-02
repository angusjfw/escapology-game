var express = require('express');
var app = express();

app.use(express.static('client'));

app.get('/', function (request, response) {
  response.render('index');
});

app.listen(3000, function () {
  console.log('Express app listening on port 3000!');
});
