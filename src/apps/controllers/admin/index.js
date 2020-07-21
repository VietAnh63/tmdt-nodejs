const mongoose = require("mongoose")
const Category = mongoose.model("Category")
const Product = mongoose.model("Product")
const User = mongoose.model("User")
const path = require("path")
const fs = require('fs')

module.exports.dashboard = async function(req, res) {
    // Category.find().limit(3).exec(function(err, data){
    //      console.log(data);
    // })

    //C1: Xu ly bat dong bo
    // Product.find((err, products) => {
    //      Category.find((err, categories)=>{
    //           res.render("admin/pages/dashboard", {data:{products, categories}})
    //      })
    // })

    //C2: Xu ly bat dong bo
    // console.log(1);

    // const products = await Product.find()
    // const categories = await Category.find()
    // console.log(products);
    // console.log(categories);
    // console.log(3);
    // res.render("admin/pages/dashboard", { data: { products, categories } })

    // Lay theo ID, tim theo ID thi no tra ve object
    // const category = await Category.findById("5ec6488fb4ee2f3827656e7a")
    // const category_0 = await Category.find({ _id: "5ec6488fb4ee2f3827656e7a" })
    // console.log("category", category);
    // console.log("category_0", category_0);

    //poulate cho phep truyen vao 5 tham so, path la ten muon goi toi populate
    // const products = await Product.find().populate({
    //      path: "cat_id",
    //      select:"cat_name"
    // })
    // console.log(products);

    // const categories = await Category.find().populate("products")
    // //console.log("categories",categories);
    // categories.forEach((category,index)=>{
    //      category.products.forEach((product,index)=>{
    //           console.log(product.prd_name);

    //      })

    // })

    //Them moi 1 product
    // const product = new Product({
    //      cat_id: "5db7f9faa9da0856c7a4c631",
    //      prd_name: "iPhone 12",
    //      prd_image: "iphone-11.png",
    //      prd_price: "20000000",
    //      prd_warranty: "13 Tháng",
    //      prd_accessories: "Sách, sạc, tai nghe",
    //      prd_new: "Mới 101%",
    //      prd_promotion: "Tấm dán màn hình 5D",
    //      prd_status: 1,
    //      prd_featured: 1,
    //      prd_details: " iPhone 11 chính hãng"

    // })
    // product.save()
    //console.log()

    //Update 1 product, tham so dau tien la dieu kien
    //await Product.updateOne({ _id: "5eccda556cf3832ce86156bc" }, { prd_name: "IPhone XS max 256GB" })

    //UpdateMany
    // await Product.updateMany(
    //      {_id: {$in:["5ec6851b6feb402db8e78699","5ec6840946dcba2d6e8467e1"]}},
    //      {prd_price: 2}
    // )

    //Delete
    // await Product.deleteMany({
    //      _id: {$in: ["5ec6851b6feb402db8e78699", "5ec6840946dcba2d6e8467e1"]}
    // })

    //Lam viec voi file
    // fs.writeFile(path.join(__dirname,"../../../","storage","test.txt"), "Viet Anh Dep Trai", (err)=>{
    //      console.log("err",err)
    // })
    // fs.writeFileSync(path.join(__dirname,"../../../","storage","test.txt"), "Viet Anh Dep Trai qua co", (err,data)=>{
    //      console.log("err",err)
    // })

    // fs.readFile(path.join(__dirname,"../../../","storage", "test.txt"), (err,data)=>{
    //      console.log("data",data.toString())
    // })

    //xoa file
    //fs.unlinkSync(path.join(__dirname, "../../../", "storage", "test.txt"))
    const categories = await Category.find()
    const products = await Product.find()
        //console.log(products)
    var cat_label = []
    var num_data = []
    categories.forEach((category) => {
        var x = 0
        cat_label.push(category.cat_name)
        for (var product of products) {
            if (product.cat_id.toString() === category._id.toString()) {
                x = x + 1
            }
        }
        num_data.push(x)
    })

    const number_product = await Product.count()
    const number_user = await User.count()
    res.render("admin/pages/dashboard", { data: {}, cat_label, num_data, number_product, number_user })




    // Product.find((err,data)=>{
    //      console.log("err",err);

    //      console.log("data",data);

    // })
    // res.render("admin/pages/dashboard")
}