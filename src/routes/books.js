var express = require('express');
var router = express.Router();
var reviewsRouter = require('./books/reviews');
var listingsRouter = require('./books/listings');


router.use('/:isbn/reviews',reviewsRouter);

router.use('/', listingsRouter);

module.exports = router;
