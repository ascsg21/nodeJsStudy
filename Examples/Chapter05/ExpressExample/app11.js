var express = require('express')
    , http = require('http')
    , path = require('path');
var bodyParser = require('body-parser')
    , static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');

var app = express();

var router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

router.route('/process/showCookie').get(function(req, res) {
  console.log('/process/showCookie 호출됨.');

  res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req, res) {
  console.log('/process/setUserCookie 호출됨');

  res.cookie('user', {
    id: 'mike',
    name: '소녀시대',
    authorized: true
  });

  res.redirect('/process/showCookie');
});

app.use('/', router);

var errorHnadler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHnadler);

http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
