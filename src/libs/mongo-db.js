const mongoose = require("mongoose")
require("../apps/models/category")
require("../apps/models/product")
require("../apps/models/user")
require("../apps/models/comment")
//const uris = "mongodb://127.0.0.1:27017/Vietpro_mongodb"
const uris = process.env.MONGODB_URI
//const uris = "mongodb://mongodb/Vietpro_mongodb"

//uris: link connect toi mongodb
mongoose.connect(uris)