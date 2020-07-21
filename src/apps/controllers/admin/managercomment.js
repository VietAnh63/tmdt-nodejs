const mongoose = require("mongoose")
const Comment = mongoose.model("Comment")

module.exports.managercomment = function(req, res) {
    //const products = await Product.find().populate("comments")
    res.render("admin/pages/managercomment")
}

module.exports.deletecomment = async function(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/admin/comment")
    }
    await Comment.findByIdAndDelete(id)

    return res.redirect("/admin/comment")
}