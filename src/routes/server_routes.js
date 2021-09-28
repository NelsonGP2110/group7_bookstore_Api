import {
  //getBookByTitle, // No need for this. It is the same as getBooks
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

  //app.route('/books/title').get(getBookByTitle); // No need for this. It is the same as getBooks
  app.route('/books/genre').get(getBookByGenre);
  app.route('/books/top10').get(getBookTop10);
};

export default routes;
