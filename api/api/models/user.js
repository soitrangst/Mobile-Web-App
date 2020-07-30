const mongoose = require('mongoose');

const check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userAuth = mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: check

    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', userAuth)