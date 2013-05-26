var app = require(APP_ROOT + '/app');

app.get('/', function(req, res, next) {
  return res.render('recommendedBook',{bookTitle: "The Sun Also Rises",quote: "bull"})
});