var path = require('path');
var express = require('express');
var logger = require('morgan');
var tweetClient = require('./twitterClient');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var router = express.Router();

router.get('/api/keywordTweets', function(req, res, next) {
  tweetClient.getKeywordTweets((err, tweets)=>{
    if(err){
      res.status(err.status || 500);
      res.render('error: '+ err.message);
    }
    res.json(tweets);
  })
});



router.get('/api/cityTweets', function(req, res, next) {
    tweetClient.getCityTrends((err, response)=>{
      if(err){
        res.status(err.status || 500);
        res.render('error: '+ err.message);
      }
      
      const location = response[0].locations[0];
      const trends = response[0].trends;
      res.json({trends, location});
    })
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to my webpage', desc:'Twitter Project' });
  });

app.use('/', router);

app.listen(8005, ()=>{
    console.log('listening in port 8005...')
});

