const mongoose = require("mongoose")
const CommentModel = mongoose.model("Comment")
const ProductModel = mongoose.model("Product")
const ejs = require("ejs")
const path = require("path")
exports.getCommentForProduct = async(req, res) => {

    const { id } = req.body
    console.log(req.body)
    const page = parseInt(req.body.page)
    const limit = 3;
    const skip = (page - 1) * limit

    const totalDocuments = await CommentModel.find({ prd_id: id }).countDocuments()
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

    const comments = await CommentModel.find({ prd_id: id }).sort("-_id").limit(limit).skip(skip)


    // get path of folder views
    const viewPath = req.app.get("views")
        //console.log(viewPath)
    const html = await ejs.renderFile(path.join(viewPath, "site/components/comment-product.ejs"), { comments, total: totalDocuments, range: rangerForDot, page, totalPages })
        //console.log("html", html)
    res.json({
        status: "success",
        data: {
            html: html
        }
    })
}


exports.getCommentForAdmin = async(req, res) => {

    const page = parseInt(req.body.page)
    const limit = 5;
    const skip = (page - 1) * limit

    const totalDocuments = await ProductModel.find().countDocuments()
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

    //const comments = await CommentModel.find().sort("-_id").limit(limit).skip(skip)
    const products = await ProductModel.find().populate("comments").sort("-_id").limit(limit).skip(skip)

    // get path of folder views
    const viewPath = req.app.get("views")
        //console.log(viewPath)
    const html = await ejs.renderFile(path.join(viewPath, "admin/components/comment-admin.ejs"), { products, total: totalDocuments, range: rangerForDot, page, totalPages })
    console.log("html", html)
    res.json({
        status: "success",
        data: {
            html: html
        }
    })
}