const { response } = require('express');
var cron = require('node-cron');
var express = require('express');
var router = express.Router({mergeParams:true});
var BookModel = require('../../models/book_model');
var ReviewModel = require('../../models/review');

//const { routes } = require('../../app.js');

var sortColumns = ['score','datestamp']; 


router.get('/', (req, res, next)=> {
    let query = req.query; // Alias for the request query object
    let sortDirection = query.sortDirection ? query.sortDirection.toLowerCase() === "desc" ? -1 : 1: 1; 
    let sortColumn = query.sortColumn ? query.sortColumn.toLowerCase() : "score"; 
    sortColumn = sortColumns.includes(sortColumn) ? sortColumn: sortColumns[0];  

    ReviewModel.find({
        isbn: req.params.isbn
    },
    null,
    {
        sort:{[sortColumn]: sortDirection} 
    })
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.status(400).json({"error": err});
    });
  });


router.post('/', (req, res, next)=>{
    let errors=[];
    let body = req.body; 
    let user_id = "61639b62f40ed2adc9fa3486"; 

    
    if(!body.score){
        errors.push("Score must be specified");
    }else if(body.score<1 || body.score>5){
        errors.push("Rating's score must be between 1 and 5");
    }

    // If we have an error, return a Bad Request response with the errors as json
    if(errors.length){
        res.status(400).json({"errors":errors}).end();    
    }

    // Check if the user has already reviewed the book
    ReviewModel.find({
        user_id: user_id,
        isbn: req.params.isbn
    })
    .then(doc=>{
        if(doc.length>0){
            res.status(400).json({"error": "Only a single review is allowed per user"});
            return;
        }else{
            let review = new ReviewModel({
                user_id: user_id,
                isbn: req.params.isbn,
                score: body.score,
                comment: body.comment,
                datestamp: Date.now()
            });

            review.save()
            .then(doc=>{
                res.json(doc);
            })
            .catch(err=>{
                res.status(400).json({"error": err});
            });
        }
    })
    .catch(err=>{
        res.status(500).json({"error": err});
    });
});


router.get('/:id',(req, res, next)=>{    
    ReviewModel.find({
        _id: req.params.id
    })
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.status(400).json({"error":"The specifid review does not exist"});
    });
});


router.patch('/:id',(req,res,next)=>{
    let errors=[];
    let body = req.body;

    // Check to ensure a review score is given and that it ranges between 1 and 5
    if(!body.score){
        errors.push("Score must be specified");
    }else if(body.score<=0 || body.score>5){
        errors.push("Review's score must be between 0 and 5");
    }

    // Return any errors present
    if(errors.length){
        res.status(400).json({"errors":errors});
        return;    
    }

    let user_id = "61639b62f40ed2adc9fa3486"; // Session user id

    ReviewModel.findOneAndUpdate({
        // Search Query
        _id: req.params.id,
        user_id: user_id
    },
    {
        // Attributes to update
        score: body.score,
        comment: body.comment,
        datestamp: Date.now()
    },
    {
        new: true, // Return the updated document
        //runValidators: true // Validate before update
    })
    .then(doc=>{
        res.json(doc);
    })
    .catch(err=>{
        res.status(400).json(err);
    });
});


router.delete('/:id',(req, res, next)=>{
    // Delete book review for the current logged in session user

    let user_id = "61639b62f40ed2adc9fa3486"; // Session user id, retrieve this from your implemented authentication system

    ReviewModel.findOneAndRemove({
        _id: req.params.id,
        user_id: user_id
    })
    .then(()=>{
        res.json({"message":"Review successfully deleted"});
    })
    .catch(err=>{
        res.status(400).json({"error": err});
    });
});


cron.schedule('* * * * *', function(){
    let now = Date.now();  //Get date in milliseconds
    let lastUpdateTime = new Date(now-60000); //Subtract 1 minute

    ReviewModel.find({
        datestamp:{$gte: lastUpdateTime }
    })
    .then(docs=>{
        docs.forEach(doc=>{
            BookModel.findOneAndUpdate({
                isbn: doc.isbn
            },
            {
                rating: doc.score
            })
            .then({})
            .catch({});
        });

        console.log("Book rating aggregation successfully completed");
    })
    .catch(err=>{
        console.log("Book rating aggregation failed: " + err);
    });
 });

module.exports = router;
