/* eslint-disable no-restricted-globals */
const mongoose = require("mongoose")
const User = mongoose.model("User")
const joi = require("@hapi/joi")
var confirm = require('confirm-simple')



module.exports.manageruser = async function(req, res) {
    const page = parseInt(req.query.page)
    const limit = 10;
    const skip = (page - 1) * limit

    const totalDocuments = await User.find().countDocuments()
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
    const users = await User.find().sort({ user_level: 1 }).collation({ locale: "en_US", numericOrdering: true }).limit(limit).skip(skip)

    //console.log(users)
    res.render("admin/pages/manageruser", {
        users,
        range: rangerForDot,
        page,
        totalPages
    })
}

module.exports.adduser = async function(req, res) {
    //const users = await User.find()
    res.render("admin/pages/manageradduser", {
        error: ""
    })
}

module.exports.store = async function(req, res) {
    const email = req.body.user_mail
    const bodySchema = joi.object({
        user_fullname: joi.string().required(),
        user_pass: joi.string().min(3).max(15).required(),
        user_re_pass: joi.any().valid(joi.ref('user_pass')).required()
    }).unknown()

    const value = await bodySchema.validateAsync(req.body).catch(err => err)
    if (value instanceof Error) {
        return res.redirect("/admin/adduser")
    }
    let error
    const user = await User.findOne({ user_mail: email })

    if (user) {
        error = "Email đã tồn tại rồi"
    }

    if (!user) {
        const user = new User({
            user_fullname: value.user_fullname,
            user_pass: value.user_pass,
            user_level: value.user_level,
            user_mail: value.user_mail
        })

        await user.save()
        return res.redirect("/admin/user")
    }

    res.render("admin/pages/manageradduser", {
        error
    })
}

module.exports.destroy = async function(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/admin/user")
    }
    //window.alert("AAAAA")
    //console.log(result)
    await User.findByIdAndDelete(id)
    return res.redirect("/admin/user")

}

module.exports.edituser = async function(req, res) {
    const { id } = req.params
    const user = await User.findById(id)
    res.render("admin/pages/manageredituser", { user, error: "" })
}

module.exports.updateuser = async function(req, res) {
    const { id } = req.params
    const email = req.body.user_mail
    const bodySchema = joi.object({
        user_fullname: joi.string().required()
    }).unknown()

    const value = await bodySchema.validateAsync(req.body).catch(err => err)
    if (value instanceof Error) {
        return res.redirect(`/admin/edituser/${id}`)
    }
    let error
    const user_mail = await User.findOne({ user_mail: email })
    const user = await User.findById(id)

    if (user_mail && user.user_mail !== email) {
        error = "Email đã tồn tại rồi"
    }

    if (!user_mail || user.user_mail === email) {
        const userUpdate = {
            user_fullname: value.user_fullname,
            user_level: value.user_level,
            user_mail: value.user_mail
        }

        await User.updateOne({ _id: id }, { $set: userUpdate })
        return res.redirect("/admin/user")

    }
    res.render('admin/pages/manageredituser', { error, user })

}