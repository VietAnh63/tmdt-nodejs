const mongoose = require("mongoose")
const Product = mongoose.model("Product")

module.exports.managercomment = function(req, res) {
    //const products = await Product.find().populate("comments")
    res.render("admin/pages/managercomment")
}