import mongoose from 'mongoose';
import express from 'express';
import ShoppingCart from '../models/cart_model.js';
import User from '../models/user.js';

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

    //Finds the user document for the shopping cart pending creation
    // User.find({ username: req.body.username })
    //     .exec()
    //     .then(user => {
    //         if (user.length >= 1) { // create a new user for length = 0
    //             return res.status(200).json({
    //                 message: "valid User"
    //             });
    //         }
    //         else {
    //             return res.status(409).json({
    //                 message: "Email does not exist"
    //             });
    //         }

   /**const shoppingCart = await ShoppingCart.create(req.body);
   res.status(201).json({
       success: true,
       data: shoppingCart
   });**/
};

//Add books to a shopping cart
export const addToCart = (req, res, next) => {
    
}
//View books in cart
export const viewCart = (req, res, next)=> {
    
}
//Delete a book from the shopping cart
export const deleteFromCart = (req, res, next)=> {
    
}