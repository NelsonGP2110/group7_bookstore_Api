import {
  getBookByTitle,
  getBooks,
  getBookByGenre,
  getBookTop10
} from '../controllers/book_api_controllers';

const routes = app => {
  app.route('/books').get((req, res, next) => {
    //middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getBooks);

  app.route('/books/title').get(getBookByTitle);
  app.route('/books/genre').get(getBookByGenre);
  app.route('/books/top10').get(getBookTop10);
};

export default routes;
