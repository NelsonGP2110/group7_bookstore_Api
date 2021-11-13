import {
  getBooks,
  getBookByGenre,
  getBookTop10,
  getRating,
  getSelection
} from '../controllers/book_api_controllers';
import {
  createShoppingCart,
  addToCart,
  viewCart,
  deleteFromCart
} from '../controllers/cart_controllers.js';

const routes = app => {
  app.route('/books').get(getBooks);
  app.route('/books/genre').get(getBookByGenre);
  app.route('/books/top10').get(getBookTop10);
  app.route('/books/ratingselection').get(getRating);
  app.route('/books/getselection').get(getSelection);
  app.route('/cart/create').post(createShoppingCart);
  app.route('/cart/update').post(addToCart);
};

export default routes;
