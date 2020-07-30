const Post = require("../models/product")

exports.get_all_products = async(req, res, next) => {
    try {
        const products = await Post.find().limit(50)
        res.status(200).json({
            count: products.length,
            data: products
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

exports.create_new = async(req, res, next) => {
    try {
        const post = new Post({
            name: req.body.name,
            price: req.body.price,
            image: req.file.path,
            stock: req.body.stock,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            condition: req.body.condition,
            category: req.body.category,
        });
        const savedPost = await post.save()
        res.json({
            message: "Create successfull",
            createProduct: savedPost
        })
    } catch (err) {
        res.json({
            message: err
        })
    }
}

exports.get_specific = async(req, res, next) => {
    const id = req.params.productId;
    try {
        const product = await Post.findById(id)
        if (product) {
            res.status(200).json({
                data: product
            })
        } else {
            res.status(404).json({
                message: "Id not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}