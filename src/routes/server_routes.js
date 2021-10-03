import {
  getBooks,
  getBookByGenre,
  getBookTop10,
  getRating,
  getSelection
} from '../controllers/book_api_controllers';

const routes = app => {
  app.route('/books').get(getBooks);
  app.route('/books/genre').get(getBookByGenre);
  app.route('/books/top10').get(getBookTop10);
  app.route('/books/ratingselection').get(getRating);
  app.route('/books/getselection').get(getSelection);
};

export default routes;
