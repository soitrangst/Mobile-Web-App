const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');


const productRoute = require('./api/routes/products')
const orderRoute = require('./api/routes/orders')
const userRouter = require("./api/routes/user")

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
        () => { console.log('connected') }
    )
    //tool check input
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))

//public image
app.use('/uploads', express.static('uploads'))

app.use(bodyParser.json())

// header config
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next()
})

//Routes handle requestments
app.use('/products', productRoute);
app.use('/admin', userRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app