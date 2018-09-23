var express = require('express')
    , http = require('http');
var static = require('serve-static');
var path = require('path');

var app = express();

app.use('/public', static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  console.log('첫번째 미들웨어에서 요청을 처리함.');

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.end("<img src='images/house.png' width='50%'>");
});

http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
