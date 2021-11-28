import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;


const wishlistSchema = new mongoose.Schema({
	wishlist_id: ObjectId,
	_id: { type: ObjectId, ref: 'User' },
	books: [],
	username: { type: String, ref: 'User' }
});



export default mongoose.model('WishList', wishlistSchema);