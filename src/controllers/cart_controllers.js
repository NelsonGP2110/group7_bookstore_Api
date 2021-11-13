import mongoose from 'mongoose';
import express from 'express';
import ShoppingCart from '../models/cart_model.js';
import User from '../models/user_model.js';
import { BooksSchema } from '../models/books_model';

const Books = mongoose.model('Books', BooksSchema);
const app = express();
app.use(express.json());





//Create a shopping cart instance for a user
export const createShoppingCart = async (req, res, next) => {
    const cartOwner = await User.find({"username" : `${req.body.username}`}).exec()
    .then(user =>{
        if(user.length>=1) {
            const cart = new ShoppingCart({
                shopping_cart_id: mongoose.Types.ObjectId(),
                _id: user[0]._id,
                username: req.body.username
            });
            cart.save().then(result=>{
                console.log(result);
                res.status(201).json({
                    msg: `Cart created for ${req.body.username}`
                })
            })
            // return res.status(200).json({msg: "Valid User"});
        }
        else{
            return res.status(400).json({msg: "Invalid User"});
        }
            
    });
};

//Add books to a shopping cart
export const addToCart = async (req, res, next) => {
    //Finds the book details for the requested book to be added to cart
    let bookToAdd = await Books.find({"isbn" : `${req.query.isbn}`},{"title" : 1 , "price" : 1}).exec()
     let bookTitle =  bookToAdd[0].title;
    let cartOwner = await User.find({"username" : `${req.query.username}`}).exec()
    let shoppingCart = await ShoppingCart.find({"username" : `${req.query.username}`}).exec()

    let newCartBooks = shoppingCart[0].books;
    newCartBooks.push(bookTitle);
    await ShoppingCart.updateOne( { "username": `${req.query.username}` },
    {
      $set: {
        books: newCartBooks
      }});
    // person.friends.push(friend);
    // person.save(done);
    res.json({ 
        msg: `Successfully added ${bookTitle} to ${cartOwner[0].username}'s cart!`
    }
    );
   
    console.log(req.query.isbn , cartOwner[0],newCartBooks,bookTitle);
    //let bookPrice = bookToAdd[0].price
}
//View books in cart
export const viewCart = (req, res, next)=> {
    
}
//Delete a book from the shopping cart
export const deleteFromCart = (req, res, next)=> {
    
}