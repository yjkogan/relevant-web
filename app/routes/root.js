var app = require(APP_ROOT + '/app');

app.get('/', function(req, res, next) {
  return res.render('recommendedBook',{bookTitle: "The Great Gatsby",quote: "I like large parties", user: "yjkogan"})
});