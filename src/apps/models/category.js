const mongoose = require("mongoose")

//Dinh nghia nhung feild duoc phep truyen vao trong mongodb
// Thuoc tinh va kieu du lieu
const CategoryModel = new mongoose.Schema({
    cat_name: String,
    // _id: {
    //      type:mongoose.Schema.ObjectId,
    //      ref: 'Product'
    // }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

CategoryModel.virtual("products", {
    // ref la ten model
    ref: 'Product',
    //Khoa chinh
    localField: "_id",
    foreignField: "cat_id"
})


//Dang ky model voi mongoose, sau nay lay ra dung
//1- ten model, 2 luoc do, 3 ten collection
mongoose.model("Category", CategoryModel, "Category")