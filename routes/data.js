exports.index = function(req, res){
  res.render('index',{srcQuery: ''});      
};

exports.about = function(req, res){
  res.render('about',{srcQuery: ''});      
};

exports.insurance = function(req, res){
  res.render('insurance',{srcQuery: ''});      
};

exports.contact = function(req, res){
  res.render('contact',{srcQuery: ''});      
};

exports.news = function(req, res){
  res.render('news',{srcQuery: ''});      
};

exports.products = function(req, res){
  res.render('products',{srcQuery: ''});      
};

exports.search = function(req, res){
  var query = '';
  var post = req.body;
  query = post.query;
  res.render('search.ejs',{srcQuery: query});
};