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
  var result = [];
  var resultCat = [];
  if(req.query.id) {
    var productId = req.query.id;   
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
    res.render('product',{srcQuery: '', productData: result, productCatData: resultCat});
  } else if (req.query.cat) {
    var productCat = req.query.cat; 
    if(productCat.length >= 1) {
      json.forEach(catElement => {
        if(catElement.category == productCat) {
          resultCat.push(catElement);
        }
      });
    } else {
      noResult();
    }
    if(resultCat.length == 0) {
      noResult();
    }
    res.render('product',{srcQuery: '', productData: json, productCatData: resultCat});
  } else {
    res.render('product',{srcQuery: '', productData: json, productCatData: resultCat});
  }
  function noResult() {
    res.render('product',{srcQuery: '', productData: null, productCatData: resultCat});
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