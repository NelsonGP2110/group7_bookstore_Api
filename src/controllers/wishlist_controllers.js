import mongoose from 'mongoose';
import express from 'express';
import WishList from '../models/wishlist_model.js';
import User from '../models/user_model.js';
import { BooksSchema } from '../models/books_model';
import { wishlistSchema } from '../models/wishlist_model';


const Books = mongoose.model('Books', BooksSchema);
const app = express();

app.use(express.json());


//Create a wishlist
export const createWishlist = async (req, res, next) => {
    const wishOwner = await User.find({"username" : `${req.body.username}`})
    .exec()

    .then(user =>{
           if (user != 0) {
            const wish = new WishList({
                wishlist_id: mongoose.Types.ObjectId(),
                _id: user[0]._id,
                username: req.body.username
            });


            wish.save().then(result=>{
                console.log(result);
                res.status(201).json({
                    msg: `Wishlist created for ${req.body.username}`
                })
            })
        }

        else{
            return res.status(400).json({msg:  "User does not exist"});
        }
            
    });
};

//View books in cart

export const viewWishlist = async (req, res, next)=> {
    let wishOwner = await User.find({"username" : `${req.query.username}`}).exec()
    let wishlist = await WishList.find({"username" : `${req.query.username}`}).exec()
    res.json({ 
        msg:`Here is what can be found in ${req.query.username}'s Wishlist!`,
        WishItems: wishlist[0].books
    }
    );
}

//Add units to Wishlist

export const addToWishlist = async (req, res, next) => {
    //LOOKS FOR ISBN OF BOOK TO ADD
    let bookToAdd = await Books.find({"isbn" : `${req.query.isbn}`},{"title" : 1 , "price" : 1}).exec()
     let bookTitle =  bookToAdd[0].title;

    // LOOKS FOR USERNAME
    let wishOwner = await User.find({"username" : `${req.query.username}`}).exec()
    let wishList = await WishList.find({"username" : `${req.query.username}`}).exec()

    let newWishBooks = wishList[0].books;
    newWishBooks.push(bookTitle);

    await WishList.updateOne( { "username": `${req.query.username}` },
    {
      $set: {
        books: newWishBooks
      }});


    res.json({ 
        msg: `Added ${bookTitle} to ${wishOwner[0].username}'s Wishlist`
    }

    );
}



//Delete a book from the shopping cart

export const deleteFromWishlist = async (req, res, next)=> {
    //Looks for books by isbn TO REMOVE
    let bookToDelete = await Books.find({"isbn" : `${req.query.isbn}`},{"title" : 1 , "price" : 1}).exec()
    let bookTitle =  bookToDelete[0].title;

    //looks for username
    let wishOwner = await User.find({"username" : `${req.query.username}`}).exec()
    let wishList = await WishList.find({"username" : `${req.query.username}`}).exec()
 
    
    let newWishBooks = wishList[0].books;
    const index = newWishBooks.indexOf(bookTitle);
     if (index > -1) {
     newWishBooks.splice(index, 1);
     }
    //updates books within wishlsit under username
    await WishList.updateOne( { "username": `${req.query.username}` },
    {
      $set: {
        books: newWishBooks
      }});

    res.json({ 
        msg: `Removed ${bookTitle} from ${req.query.username}'s WishList!`
    }
    );
   console.log(newWishBooks);
 }