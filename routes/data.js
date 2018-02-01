var express = require('express')
var app = express()

exports.index = function(req, res){
  var json = require('../public/json/data.json').products;
  var result = [];
  var productCount = 0;
  json.forEach(element => {
    if(productCount <= 1) {
      result.push(element);
      productCount++;
    }
  });
  res.render('index',{srcQuery: '', productData: result});      
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
  var json = require('../public/json/data.json').products;
  if(req.query.id) {
    var productId = req.query.id;   
    var result = [];
    if(productId.length >= 1) {
      json.forEach(element => {
        if(element.id == productId) {
          result.push(element);
        }
      });
    } else {
      noResult();
    }
    if(result.length == 0) {
      noResult();
    }
    res.render('product',{srcQuery: '', productData: result});
  } else {
    console.log('alle');
    res.render('product',{srcQuery: '', productData: json});
  }
  function noResult() {
    res.render('product',{srcQuery: '', productData: null});
  }
};

exports.search = function(req, res){
  if(req.query.q) {
    var json = require('../public/json/data.json').products;
    var srcQuery = req.query.q; 
    var srcQueryLower = srcQuery.toLowerCase();      
    var result = [];
    if(srcQuery.length > 0) {
      json.forEach(element => {
        let elementName = element.name.toLowerCase();
        if (elementName.match(srcQueryLower + '')) {
          result.push(element);
        }
      });
      if(result.length == 0) {
        noResult();
      }
      res.render('search.ejs',{srcQuery: srcQuery, srcResult: result});
    } else {
      noResult();
    }
  } else {
    noResult();
  }
  function noResult(prefix) {
    res.render('search.ejs',{srcQuery: srcQuery, srcResult: null});
  }
};