const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // Validate the format of the email address using regular expression
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: false },
    homeAddress: { type: String, required: false },
    shopping_cart_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart'}
});

module.exports = mongoose.model('User', userSchema);