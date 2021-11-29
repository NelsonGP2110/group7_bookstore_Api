const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user_model');
const CreditCard = require('../models/credit_card_model');
//const e = require("express");
const app = express();
app.use(express.json());

export const signup = async (req, res, next) => {
    // Check if the user already exists
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) { // create a new user for length = 0
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash,  // create user with hash password
                            name: req.body.name,
                            email: req.body.email,
                            homeAddress: req.body.homeAddress
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created successfully.'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })

            }
        })
};

export const login = async (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            // Unauthorized login (Email does not exist or incorrect password)
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization failed.'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authorization failed.'
                    });
                }
                if (result) {
                    // Web Token
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Authorization successful.',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Authorization failed.'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

export const getUser = async (req, res, next) => {
    const usernamePar = req.body.username;
    User.find({ username: usernamePar })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Unauthorized request.' // Get request failed
                });
            }
            return res.status(200).json({
                username: user[0].username,
                password: user[0].password,
                name: user[0].name,
                email: user[0].email,
                homeAddress: user[0].homeAddress,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};

export const updateUser = async (req, res, next) => {
    // Check if the user exists
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length == 0) { // update user for length >= 1
                return res.status(409).json({
                    message: "User does not exist."
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        User.findOneAndUpdate({ username: req.body.username }, {
                            $set: {
                                name: req.body.name,
                                password: hash,
                                email: req.body.email,
                                homeAddress: req.body.homeAddress
                            }
                        })
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User updated successfully.'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })

            }
        })
};

export const addCreditCard = async (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length == 0) {
                return res.status(409).json({
                    message: "User does not exist."
                });
            }
            else {
                CreditCard.find({ credit_card_number: req.body.credit_card_number })
                    .then(creditCard => {
                        if (creditCard.length >= 1) {
                            return res.status(409).json({
                                message: "Credit Card already exists."
                            });
                        }
                        else {
                            const creditCard = new CreditCard({
                                credit_card_number: req.body.credit_card_number,
                                cardholder_username: req.body.username,
                                expiration_date: req.body.expiration_date,
                                security_code_cvv: req.body.security_code_cvv
                            });

                            creditCard.save(function (err) {
                                if (err) return handleError(err);
                            });

                            res.status(201).json({
                                message: 'Credit card added successfully.'
                            })
                        }
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

export const getCreditCards = async (req, res, next) => {
    User.find({ username: req.params.username })
        .exec()
        .then(user => {
            if (user.length == 0) { // update user for length >= 1
                return res.status(409).json({
                    message: "User does not exist."
                });
            }
            else {
                CreditCard.find({ cardholder_username: req.body.username },
                    function (err, result) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json(result);
                        }
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
