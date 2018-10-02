const Debt = require('../models/debts');
const User = require('../models/users');


module.exports = (req, res, next) => {
    //La primera funcion es invocada para comprobar la autorizacion a las
    //deudas, la segunda comprueba la autorizacion a los usuarios
    if(req.params.debtId){
        Debt.findById(req.params.debtId)
        .exec()
        .then( debt => {
            if(!debt){
                throw "No debt found"
            }            
            if(String(debt.user_id) ===req.userData.userId) {
                next();
            } else {
            res.status(500).json({
                message: "Auth failed"
            });
            }
        }
        ).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        );
    } 
    
    else {
       User.findById(req.params.userId)
       .exec()
       .then( user => {
           if(!user){
               throw "No user found"
           }                    
           if(String(user._id) ===req.userData.userId) {
               next();
           } else {
           res.status(500).json({
               message: "Auth failed"
           });
           }
       }
       ).catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       }
       );
       
    }
}