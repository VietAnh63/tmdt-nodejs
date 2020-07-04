const AdminController = require("./admin")
const UserController = require("./admin/manageruser")
const ProductController = require("./admin/managerproduct")
const CategoryController = require("./admin/managercategory")
const CommentController = require("./admin/managercomment")
const LoginController = require("./admin/login")
const ClientController = require("./client/index")

const AjaxController = require("./ajax")


module.exports = {
    AdminController,
    UserController,
    ProductController,
    CategoryController,
    LoginController,
    ClientController,
    AjaxController,
    CommentController
}