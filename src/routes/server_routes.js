import {
  getBooks,
  getBookByGenre,
  getBookTop10,
  getRating,
  getSelection
} from '../controllers/book_controllers';
import {
  createShoppingCart,
  addToCart,
  viewCart,
  deleteFromCart
} from '../controllers/cart_controllers.js';
import {
  signup,
  login,
  getUser,
  updateUser,
  addCreditCard,
  getCreditCards
} from '../controllers/user_controllers.js';
import {
  createWishlist,
  addToWishlist,
  viewWishlist,
  deleteFromWishlist
} from '../controllers/wishlist_controllers.js';

const routes = app => {
  app.route('/books').get(getBooks);
  app.route('/books/genre').get(getBookByGenre);
  app.route('/books/top10').get(getBookTop10);
  app.route('/books/ratingselection').get(getRating);
  app.route('/books/getselection').get(getSelection);
  app.route('/cart/create').post(createShoppingCart);
  app.route('/cart/update').post(addToCart);
  app.route('/cart/viewCart').get(viewCart);
  app.route('/cart/delete').post(deleteFromCart);
  app.route('/wishlist/create').post(createWishlist);
  app.route('/wishlist/addBook').post(addToWishlist);
  app.route('/wishlist/view').get(viewWishlist);
  app.route('/wishlist/remove').post(deleteFromWishlist);
  app.route('/user/signup').post(signup);
  app.route('/user/login').post(login);
  app.route('/user/getuser').get(getUser);
  app.route('/user/updateuser').put(updateUser);
  app.route('/user/add/creditcard').post(addCreditCard);
  app.route('/user/creditcards/').get(getCreditCards);
};

export default routes;
