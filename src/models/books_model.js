import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BooksSchema = new Schema({
  title: {
    type: String,
    required: 'Enter a title'
  },
  genre: {
    type: [String],
    required: 'Enter a genre'
  },
  author_last_name: {
    type: String,
    required: 'Enter a last name'
  },
  author_first_name: {
    type: String,
    required: 'Enter a first name'
  },
  isbn: {
    type: Number,
    required: 'Enter a Isbn code'
  },
  rating: {
    type: [Number],
    min: 1,
    max: 5
  },
  shopping_car: {
    type: Boolean
  },
  price: {
    type: Number,
    required: `Enter a price`
  },
  book_about: {
    type: String,
    required: `Enter the description of th book`
  },
  publisher: {
    type: String,
    required: `Enter the publisher`
  },
  date_published: {
    type: Date,
    required: `Enter the published date`
  },
  copies_sold: {
    type: Number
  }
});
