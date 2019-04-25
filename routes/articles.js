var express = require('express');
var router = express.Router();
var Articles = require('../models/articles');

router.get('/', function(req, res, next) {
  res.render('articles/index', { title: 'Index' });
});

router.get('/view/:slug', function(req, res, next) {
  res.render('articles/view', { title: 'View' });
});

router.get('/app', function(req, res, next) {
  res.render('articles/app', { title: 'CMS' });
});

module.exports = router;