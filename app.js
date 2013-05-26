require('./config');

var express = require('express')
  , hoganEngine = require('hogan-engine')
  , app = express();

module.exports = app;

app.configure(function() {

  // Enable us to get form data / read the body
  app.use(express.bodyParser());

  app.engine('html', hoganEngine);
  app.set('views', __dirname + '/app/templates');
  app.set('view engine', 'html');

  // Serve static files correctly
  app.use('/js',express.static(APP_ROOT + '/public/js'));
  app.use('/css',express.static(APP_ROOT + '/public/css'));
  app.use('/img',express.static(APP_ROOT + '/public/img'));  
});

// Require the root app
require(APP_ROOT + '/app/routes/root');

app.listen(process.env.PORT);
console.log("Listening on port " + process.env.PORT);