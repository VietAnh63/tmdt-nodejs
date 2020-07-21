const {
    Router
} = require("express")
const router = Router()
const multer = require("multer")
const Joi = require("@hapi/joi")
const path = require("path")
const checkLogin = require("../apps/middlewares/check-login")
const checkLogout = require("../apps/middlewares/check-logout")
const check_level = require("../apps/middlewares/check-level")
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.resolve("src", "storage"))
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now())
        }
    })
})

const {
    AdminController,
    UserController,
    ProductController,
    CategoryController,
    LoginController,
    ClientController,
    AjaxController,
    CommentController
} = require("../apps/controllers")

router.route("/login").get(checkLogin, LoginController.login).post(checkLogin, LoginController.postLogin)
router.use("/admin", checkLogout)
router.get("/logout", LoginController.logout)

router.get("/admin/dashboard", AdminController.dashboard)

router.get("/admin/product", ProductController.managerproduct)
router.route("/admin/addproduct").get(ProductController.addproduct).post(upload.single("prd_image"), ProductController.store)
router.get("/admin/deleteproduct/:id", ProductController.destroy)
router.route("/admin/editproduct/:id").get(ProductController.edit).post(upload.single("prd_image"), ProductController.update)


router.get("/admin/user", UserController.manageruser)
router.route("/admin/adduser").get(UserController.adduser).post(UserController.store)
router.get("/admin/deleteuser/:id", UserController.destroy)
router.route("/admin/edituser/:id").get(UserController.edituser).post(UserController.updateuser)

router.get("/admin/category", CategoryController.managercategory)
router.get("/admin/comment", CommentController.managercomment)
router.get("/admin/deletecomment/:id", CommentController.deletecomment)

router.route("/infor-user/:id").get(UserController.changeInfor).post(UserController.updateInfor)

router.get("/", ClientController.home)

router.post("/add-to-cart", ClientController.addToCart)
router.get("/cart", ClientController.getCart)
router.get("/product-detail-:id", ClientController.productDetail)
router.get("/category-:id", ClientController.category)

router.post("/product-detail-:id/comments", ClientController.addComment)

router.post("/ajax/get-comment-product", AjaxController.getCommentForProduct)
router.post("/ajax/get-comment-admin", AjaxController.getCommentForAdmin)
router.post("/ajax/update-cart", AjaxController.updateCart)
router.post("/ajax/delete-cart", AjaxController.deleteCart)
router.post("/ajax/update-cart-0", AjaxController.updateCarttoOld)
router.get("/ajax/delete-all-cart", AjaxController.deleteAllCart)

router.post("/cart/order", ClientController.order)
router.post("/cart/order-success", ClientController.orderSuccess)

router.get("/search", ClientController.search);
router.get("/error", async function (req,res,next){
    const bodySchema = Joi.object({
        a:Joi.string().required()
    })
    try {
        const value = await bodySchema.validateAsync({a:"10"})
        if(value.a !== 10){
            throw new Error("a is not aqua 10")
        }
    }catch(error){
        next(error)
    }
})

module.exports = router