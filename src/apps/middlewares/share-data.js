const mongoose = require("mongoose")
const CategoryModel = mongoose.model("Category")
const {formatPrice} = require("../../libs/utils")
module.exports = async function(req, res, next) {
    //Su dung res locals

    res.locals.menus = await CategoryModel.find()
    res.locals.miniCart = req.session.cart || []
        //console.log(req.session.cart)
    res.locals.formatPrice = formatPrice
    next()
}