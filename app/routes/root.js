var app = require(APP_ROOT + '/app');

app.get('/', function(req, res, next) {

  if (!req.query.title) { return res.send("missing 'title' parameter in GET"); }
  if (!req.query.quote) { return res.send("missing 'quote' parameter in GET"); }
  if (!req.query.user) { return res.send("missing 'user' parameter in GET"); }

  return res.render('recommendedBook',{bookTitle: req.query.title, quote: req.query.quote, user: req.query.user})
});