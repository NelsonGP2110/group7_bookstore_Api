import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartBooksSchema = new mongoose.Schema({
	shopping_cart_item_id: ObjectId,
	isbn: { type: String, ref: 'BooksSchema' },
	price: { type: Number, min: 0.0, required: true },
	quantity: { type: Number, default: 1 }, //maybe add a saveforlater section
});

const ShoppingCartSchema = new mongoose.Schema({
	shopping_cart_id: ObjectId,
	_id: { type: ObjectId, ref: 'User' },
	books: [cartBooksSchema],
	username: { type: String, ref: 'User' }
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);