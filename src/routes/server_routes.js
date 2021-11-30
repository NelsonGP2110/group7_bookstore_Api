import {
    getBooks,
    getBookByGenre,
    getBookTop10,
    getRating,
    getSelection,
    getBookByIsbn,
    getBookByAuthor,
    createBook,
} from '../controllers/book_api_controllers';
import {
    createShoppingCart,
    addToCart,
    viewCart,
    deleteFromCart,
} from '../controllers/cart_controllers.js';
import { createAuthor } from '../controllers/author_controllers';
import {
    authenticateUser,
    authorizeRoles,
} from '../middleware/auth_middleware';

const routes = app => {
    app.route('/books')
        .get(getBooks)
        .post([authenticateUser, authorizeRoles('admin')], createBook);
    app.route('/books/genre').get(getBookByGenre);
    app.route('/books/top10').get(getBookTop10);
    app.route('/books/ratingselection').get(getRating);
    app.route('/books/getselection').get(getSelection);
    app.route('/cart/create').post(createShoppingCart);
    app.route('/cart/update').post(addToCart);
    app.route('/cart/viewCart').get(viewCart);
    app.route('/cart/delete').post(deleteFromCart);
    app.route('/books/isbn').get(getBookByIsbn);
    app.route('/books/author').get(getBookByAuthor);
    app.route('/authors').post(
        [authenticateUser, authorizeRoles('admin')],
        createAuthor
    );
};

export default routes;
