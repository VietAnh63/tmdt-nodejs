
const mongoose = require("mongoose")
const Category = mongoose.model("Category")

module.exports.managercategory = async function(req,res){
     const categories = await Category.find().populate("products")
     res.render("admin/pages/managercategory", {categories})
}