const mongoose = require('mongoose');

const creditCardsSchema = new mongoose.Schema({
    credit_card_number: { type: String, required: false },
    cardholder_username: { type: String, required: false, ref: 'User' },
    expiration_date: { type: Date, required: false },
    security_code_cvv: { type: String, required: false }
});

module.exports = mongoose.model('CreditCard', creditCardsSchema);