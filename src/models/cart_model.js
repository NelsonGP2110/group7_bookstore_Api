import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const ShoppingCartSchema = new mongoose.Schema({
  shopping_cart_id: ObjectId,
  _id: { type: ObjectId, ref: 'User' },
  books: [],
  username: { type: String, ref: 'User' }
});
//removed from books: books: [cartBooksSchema]
export default mongoose.model('ShoppingCart', ShoppingCartSchema);
