const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Debt = require('../models/debts');


exports.create_user = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Mail already used'
            });
        }
        else{
            bcrypt.hash(req.body.password, 10,(err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    image: req.body.image
                    });  
                    user.save()
                    .then( result => {
                        res.status(201).json({
                            message: 'User created succesfully'
                        });
                    })
                    .catch( err=> {
                        res.status(500).json({
                            error: err
                        });
                    })
                }
            });
        }
    });
}
exports.login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then( user => {
        if (user. length < 1) {
            
            return res.status(401).json({
                message: 'Auth failed'
            });
        }            
            bcrypt.compare(req.body.password, user[0].password, (err, success) => { 
                if (err) {                    
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                } 
                
                if (success) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0].id
                    },
                    process.env.JWT_KEY, 
                    );
                     return res.status(201).json({
                        message: `Welcome ${user[0].email}`,
                        token,
                        id: user[0].id,
                     });
                }
                
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
    })
    .catch( err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.delete_account = (req, res, next) => {
    console.log("HOLA");
    
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(() => {
        Debt.deleteMany({user_id: req.params.userId
        })
        .exec()
        .then(() => {
            return res.status(200).json({message: 'User deleted successfully'
        })
    })
    })
    .catch( err => {res.status(500).json({
        error: err
    })})
}

exports.update_user = (req, res, next) => {
    console.log(req.body.email);
    
    const user = new User({
        name:  req.body.name,
        image: req.body.image,
    });
    User.updateOne({_id: req.params.userId}, user)
    .exec()
    .then( 
        () => {
            return res.status(200).json({message: 'User updated successfully'})
        }
    )
    .catch( err => {res.status(500).json({
        error: err
        })
    })
}