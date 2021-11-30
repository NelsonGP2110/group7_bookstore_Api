import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'Please provide first name',
    },
    last_name: {
        type: String,
        required: 'Please provide last name',
    },
    biography: {
        type: String,
        required: 'Please provide author biography',
    },
    publisher: {
        type: String,
        required: 'Please provide author publisher',
    },
});

export default mongoose.model('Author', AuthorSchema);
