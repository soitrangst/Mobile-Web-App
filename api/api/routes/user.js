const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv/config');


const User = require('../models/user')

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'The email was signed'
                })
            } else {
                bcrypt.hash(req.body.password, 12, async(err, hash) => {
                    if (err) {
                        return res.status(500).json({ message: err })
                    } else {
                        const user = await new User({
                            email: req.body.email,
                            password: hash
                        })

                        try {
                            const userSaving = await user.save()
                            res.status(201).json({
                                message: "Signup successfully"
                            })

                        } catch (err) {
                            res.json({
                                message: err
                            })
                        }
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
})

router.post('/login', async(req, res, next) => {
    try {
        const checkUser = await User.find({ email: req.body.email })
        if (checkUser.length < 1) {
            return res.status(404).json({
                message: `The email doesn't exist`
            })
        } else {
            bcrypt.compare(req.body.password, checkUser[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: `The authentication failed`
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: checkUser[0].password.email,
                            userId: checkUser[0]._id
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1d"
                        }
                    )
                    return res.status(200).json({
                        message: "The authentication success",
                        token: token
                    })
                }
                res.status(401).json({
                    message: `The authentication failed`
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router