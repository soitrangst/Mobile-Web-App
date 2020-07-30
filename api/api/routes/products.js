const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth')

const Product_Controller = require("../controller/product-controller")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("Name")
        cb(null, "uploads")
    },
    filename: function(req, file, cb) {
        console.log("Name")
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error("please upload type of picture is jpeg or png"), false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})



//get all products
router.get('/', Product_Controller.get_all_products)

//create product unauthentication
router.post('/', checkAuth, upload.single('image'), Product_Controller.create_new)

// get specific product
router.get('/:productId', Product_Controller.get_specific)

module.exports = router