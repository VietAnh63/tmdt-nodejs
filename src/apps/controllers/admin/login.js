const mongoose = require("mongoose")
const User = mongoose.model("User")
    // const Category = mongoose.model("Category")
module.exports.login = function(req, res) {
    // Category.find().exec((err, data)=>{
    //      console.log(data);

    // })
    res.render("admin/pages/login", { error: "" })
}

module.exports.postLogin = async function(req, res) {
    const email = req.body.mail
    const pass = req.body.pass

    const user = await User.findOne({ user_mail: email })
        //console.log(email)
    let error

    if (!user) {
        error = "Tai khoan khong hop le"
    }

    if (!error && user.user_pass !== pass) {
        error = "Mat khau khong hop le"
    }

    if (!error) {
        req.session.user = user
            //console.log(req.session.user)
        return res.redirect("/admin/dashboard")
    }
    res.render("admin/pages/login", {
        error
    })

}
module.exports.logout = function(req, res) {
    req.session.destroy()
    res.redirect("/login")
}