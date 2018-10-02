'use strict'

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//SETTINGS

mongoose.connect(process.env.DatabaseURL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', true);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-METHODS', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//ROUTES
const usersRoute = require('./routes/users');
const debtsRoute = require('./routes/debts');

app.get('/', (req, res) => {
    res.send('Connection success');
});

app.use('/users', usersRoute);
app.use('/debts', debtsRoute);

//Captura el resto de rutas no contempladas previamente y devuelve error.
app.use((req, res, next) =>{
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
