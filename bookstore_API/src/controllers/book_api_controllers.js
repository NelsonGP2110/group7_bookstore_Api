import mongoose from 'mongoose';
import { BooksSchema } from '../models/books_model';

const Books = mongoose.model('Books', BooksSchema);

export const getBooks = (req, res) => {
  Books.find({}, (err, books) => {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
};

/*this send a request for the param title and send a response, 
if pass responds with collection books by title, if dont throw an error*/
export const getBookByTitle = (req, res) => {
  Books.findById(req.params.title, (err, books) => {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
};

//----------------------- NELSON FEATURE-------------------------//
//-----------------GET A LIST OF BOOKS BY GENRE-----------------//

/*this sends a request for the param genre , using a query to get the param and the key
and then show the matches from the db.*/
export const getBookByGenre = (req, res) => {
  /*const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const genre = readline.question(`Enter a genre: `, name => {
    //midwares
    // Cleaning console input.
    let str = name.trim();
    let str1 = str.toLowerCase();
    let str2 = str1.charAt(0).toUpperCase() + str1.slice(1);

    //console.log(`This is name: ${str2}`);
   Books.find({ genre: { $all: [str2] } }, (err, books) => {
      if (err) {
        res.send(err);
      }
      res.json(books);
    });
    readline.close();

  });*/
  //Cleaning query input.
  let genre = req.query.genre;
  let str = genre.trim();
  let str1 = str.toLowerCase();
  let str2 = str1.charAt(0).toUpperCase() + str1.slice(1);
  //console.log(str2);
  Books.find({ genre: { $all: [str2] } }, (err, books) => {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
};

//----------------------- NELSON FEATURE-------------------------//
//-------------------GET A LIST OF TOP 10 BOOKS-----------------//

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
