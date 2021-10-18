const { response } = require('express');
var express = require('express');
var router = express.Router({mergeParams:true});
var BookModel = require('../../models/book');

router.get('/', (req,res)=>{
    BookModel.find({}, (err, books) => {
        if (err) {
          res.send(err);
        }
       
        res.json(books);
    });
});

router.get('/genre',(req,res)=>{
    //Cleaning query input.
  let genre = req.query.genre;
  let str = genre.trim();
  let str1 = str.toLowerCase();
  let str2 = str1.charAt(0).toUpperCase() + str1.slice(1);
  
  BookModel.find({ genre: { $all: [str2] } }, (err, books) => {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
});

router.get('/top10',(req,res)=>{
    BookModel.find(
        {}, 
        null, 
        { 
            sort: { 
                copies_sold: 'desc' 
            }, 
            limit: 10 
        }, 
        function(err,books) {
            if (err) {
                res.send(err);
            }
            
            res.json(books);
        }
    );
});

router.get('/ratingselection', (req,res)=>{
    let userRating = parseFloat(req.query.rating);

    if(userRating<1 || userRating>5){
        res.status(400).json({"error":"Selection out of range. Please select a value between 1 and 5 included."});
        return;
    }
    
    BookModel.find({
        rating: { $gte: userRating }
    }, 
    (err, books) => {
        if (err) {
          res.send(err);
        }

        res.json(books);

});

router.get('/getselection', (req,res)=>{
    let start = parseInt(req.query.startpos) - 1;
    let temp = parseInt(req.query.endpos);
    let end = temp - start;
    
    BookModel.find({}, null, { skip: start, limit: end }, (err, books) => {
        if (err) {
            res.send(err);
        }
        
        res.json(books);
    });
});

module.exports = router;
