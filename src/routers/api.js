const {Router} = require("express")
const router = Router()

router.get("/", (reg,res)=>{
     res.json({
          success:true,
          response: "Hello"
     })
})

module.exports = router