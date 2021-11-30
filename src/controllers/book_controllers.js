import mongoose from 'mongoose';
import { BooksSchema } from '../models/books_model';

const Books = mongoose.model('Books', BooksSchema);
//GET the whole book database
export const getBooks = (req, res) => {
  Books.find({}, (err, books) => {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
};

/*send a request for the param genre , using a query to get the param and the key
and then show the matches from the db.*/
export const getBookByGenre = (req, res) => {
  //Cleaning query input.
  let genre = req.query.genre;
  let str = genre.trim();
  let str1 = str.toLowerCase();
  let str2 = str1.charAt(0).toUpperCase() + str1.slice(1);
  Books.find({ genre: { $all: [str2] } }, (err, books) => {
    if (err) {
      res.send(err);
    }
    if (books == null || books == 0) {
      res.json('Genre not found');
    } else {
      res.json(books);
    }
  });
};

/* This function sort the db using the key copies_sold from higher to lower.
Then, it respond by sending the first 10 highest values. */
export const getBookTop10 = (req, res) => {
  Books.find({}, null, { sort: { copies_sold: 'desc' }, limit: 10 }, function(
    err,
    books
  ) {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
};

export const getRating = (req, res) => {
  let userRating = parseFloat(req.query.rating);

  Books.aggregate(
    [
      { $unwind: '$rating' },
      { $group: { _id: '$title', avg_rating: { $avg: '$rating' } } },
      { $match: { avg_rating: { $gte: userRating } } }
    ],
    (err, books) => {
      if (err) {
        res.send(err);
      } else if (userRating < 1 || userRating > 5) {
        res.json(
          `Selection out of range. Please select a value between 1 and 5 included.`
        );
      } else if (books == 0) {
        res.json(
          `No books with rating ${userRating} or higher in the database`
        );
      } else {
        res.json(books);
      }
    }
  );
};
// GET a portion of the database
export const getSelection = (req, res) => {
  let start = parseInt(req.query.startpos) - 1;
  let temp = parseInt(req.query.endpos);

  if (temp <= start) {
    res.json(`Invalid ending number. Try again`);
  } else if (temp < 0 || start < 1) {
    res.json(`Invalid selection. Try again`);
  } else {
    let end = temp - start;

    Books.find({}, null, { skip: start, limit: end }, (err, books) => {
      if (err) {
        res.send(err);
      }
      res.json(books);
    });
  }
};