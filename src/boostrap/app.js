const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")


app.use(session({
    secret: "vietanhdeptrai",

}))


//Day la mot middleware, trung gian ket noi req voi res
//Tham so next cho phep chuyen sang cac middleware khac
app.use((req, res, next) => {
    //console.log("Next", req.session)
    req.session.abc = 10
        //console.log(req.session)
    next()
})

require("../libs/mongo-db")
app.use(require("../apps/middlewares/check-level"))
app.use(require("../apps/middlewares/share-data"))
app.use(express.static(path.join(__dirname, "..", "public")))
    //console.log(path.join(__dirname, "..","public"))
    //set dung de dua nhung thiet lap vao express
    //use xu ly middleware

//Using body-parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.set("views", path.join(__dirname, "..", "apps", "views"))
app.set("view engine", "ejs")

//console.log(app);

app.use("/api", require("../routers/api"))
app.use("/", require("../routers/web"))


module.exports = app