var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('indexer', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render(('login', {title: 'Login'}));
});
router.get('/error', function(req, res, next) {
  res.render(('error', {title: 'Login'}));
});
router.get('/profile', function(req, res, next) {
  res.render(('profile', {title: 'Login'}));
});
router.get('/register', function(req, res, next) {
  res.render(('register', {title: 'Login'}));
});
router.get('/feed', function(req, res, next) {
  res.render(('table', {title: 'Login'}));
});


module.exports = router;
