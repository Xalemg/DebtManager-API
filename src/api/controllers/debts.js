const Debt = require('../models/debts');
const User = require('../models/users');
const mongoose = require('mongoose');

exports.get_debts = (req, res, next) => {
    User.findById(req.userData.userId)
    .select("email name _id")
    .populate('debts', 'debtor amount date _id')
    .exec()
    .then(docs => {
            res.status(200).json({
            count: docs.debts.length,
            debts: docs.debts.map(doc => {
                return {
                debtor: doc.debtor,
                reason: doc.reason,
                amount: doc.amount,
                date: doc.date,
                _id: doc._id,
                request: {
                    Type: 'GET',
                    url: 'http://localhost:3000/debts/'+doc._id
                }
            }
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
    );
}

exports.get_debt = (req, res, next) => {
    Debt.findById(req.params.debtId)
        .exec()
        .then( debt => {
            if(!debt){
                return res.status(404).json({
                    message: 'Debt not found'
                }) 
            }
            res.status(200).json({
                _id: debt._id,
                debtor: debt.debtor,
                user_id: debt.user_id,
                reason: debt.reason,
                amount: debt.amount,
                date: debt.date,
            })
        }
        ).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        );
}

exports.add_debt = (req, res, next) => {   
    const debt = new Debt({
        _id: mongoose.Types.ObjectId(),
        user_id : req.userData.userId,
        debtor:  req.body.debtor,
        reason:  req.body.reason,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date
    });
    debt.save()
    .then(
        User.findById(req.userData.userId)
        .exec()
        .then( user => {
            user.debts.push(debt);
            res.status(201).json({
                message: "Debt saved successfully",
                debt  
            });
            return user.save();
        }
        )
        .catch( err=> {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        })
    )
    .catch( err=> {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
}
exports.delete_debt = (req, res, next) => {
    
    Debt.deleteOne({_id: req.params.debtId})
    .exec()
    .then( 
        User.findById(req.userData.userId)
        .exec()
        .then(user =>{
            user.debts.splice(req.params.debtId,1);
            user.save();
        }))
        .then(() => {
            return res.status(200).json({message: 'Debt deleted successfully'})
        })
    .catch( err => {res.status(500).json({
        error: err
        })
    })
}

exports.update_debt = (req, res, next) => {
    const debt = new Debt({
        debtor:  req.body.debtor,
        reason:  req.body.reason,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date
    });
    Debt.updateOne({_id: req.params.debtId}, debt)
    .exec()
    .then( 
        () => {
            return res.status(200).json({message: 'Debt updated successfully'})
        }
    )
    .catch( err => {res.status(500).json({
        error: err
        })
    })
}