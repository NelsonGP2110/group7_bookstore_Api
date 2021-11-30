const { ObjectId }= require('mongoose');
let mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'User'
    },
    isbn: {
        type: String
    },
    score: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    datestamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports= mongoose.model('Review', reviewSchema);
