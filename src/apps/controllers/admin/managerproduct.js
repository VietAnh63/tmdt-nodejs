const mongoose = require("mongoose")
const Product = mongoose.model("Product")
const fs = require("fs")
const path = require("path")
const Category = mongoose.model("Category")
const joi = require("@hapi/joi")

module.exports.managerproduct = async function(req, res) {
    const page = parseInt(req.query.page)
    const limit = 3;
    const skip = (page - 1) * limit

    const totalDocuments = await Product.find().countDocuments()
        //console.log(totalDocuments);

    const totalPages = Math.ceil(totalDocuments / limit)
    const range = []
    const rangerForDot = []
    const deltal = 2

    const left = page - deltal
    const right = page + deltal
        //console.log(right)
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i <= right)) {
            range.push(i)
        }
    }
    //console.log(range)
    let temp
    range.map((i) => {
            if (temp) {
                if (i - temp === 2) {
                    rangerForDot.push(i - 1)
                } else if (i - temp !== 1) {
                    rangerForDot.push("...")
                }
            }
            temp = i
                //console.log("temp", temp)
            rangerForDot.push(i)

        })
        //console.log(rangerForDot)
    const products = await Product.find().sort("-_id").populate("cat_id").limit(limit).skip(skip)
        //console.log("product",products);
        //console.log("req.query", req.query);
        //console.log(req.session)
    res.render("admin/pages/managerproduct", { products, range: rangerForDot, page, totalPages })
}

module.exports.addproduct = async function(req, res) {
    const categories = await Category.find()
    res.render("admin/pages/manageraddproduct", { categories })
}

module.exports.store = async function(req, res) {


    const file = req.file
        //console.log(file)
    const pathUpload = path.resolve("src", "public", "images", "products")


    const contentFile = fs.readFileSync(file.path)
    fs.unlinkSync(file.path)
    fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile)


    //validate
    const bodySchema = joi.object({
        prd_name: joi.string().required(),
        prd_price: joi.number().required(),
    }).unknown()

    const value = await bodySchema.validateAsync(req.body).catch(err => err)
    if (value instanceof Error) {
        return res.redirect("/admin/addproduct")
    }


    const product = new Product({
        prd_name: value.prd_name,
        cat_id: value.cat_id,
        prd_image: file.originalname,
        prd_price: value.prd_price,
        prd_warranty: value.prd_warranty,
        prd_accessories: value.prd_accessories,
        prd_promotion: value.prd_promotion,
        prd_new: value.prd_new,
        prd_status: value.prd_status,
        prd_details: value.prd_details,
        prd_featured: value.prd_featured

    })

    await product.save()

    return res.redirect("/admin/product")

}

module.exports.destroy = async function(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/admin/product")
    }
    const product = await Product.findByIdAndDelete(id)
    if (product) {
        const pathUpload = path.resolve("src", "public", "images", "products")
        if (fs.existsSync(path.join(pathUpload, product.prd_image))) {
            fs.unlinkSync(path.join(pathUpload, product.prd_image))
        }
    }
    return res.redirect("/admin/product")
}


module.exports.edit = async function(req, res) {
    const { id } = req.params
    const categories = await Category.find()
    const product = await Product.findById(id)
    res.render("admin/pages/managereditproduct", { categories, product })
}

module.exports.update = async function(req, res) {
    const { id } = req.params
    const file = req.file
        //console.log(file)
    if (file) {
        const pathUpload = path.resolve("src", "public", "images", "products")
        const contentFile = fs.readFileSync(file.path)
        fs.unlinkSync(file.path)
        fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile)

    }

    //validate
    const bodySchema = joi.object({
        prd_name: joi.string().required(),
        prd_price: joi.number().required(),
    }).unknown()

    const value = await bodySchema.validateAsync(req.body).catch(err => err)
    if (value instanceof Error) {
        return res.redirect(req.path)
    }

    const productUpdate = {
        prd_name: value.prd_name,
        cat_id: value.cat_id,
        prd_price: value.prd_price,
        prd_warranty: value.prd_warranty,
        prd_accessories: value.prd_accessories,
        prd_promotion: value.prd_promotion,
        prd_new: value.prd_new,
        prd_status: value.prd_status,
        prd_details: value.prd_details,
        prd_featured: value.prd_featured
    }
    if (file) {
        productUpdate['prd_image'] = file.originalname
    }

    await Product.updateOne({ _id: id }, { $set: productUpdate })
    return res.redirect("/admin/product")

}