const http = require('http')
const app = require('../boostrap/app')
const config = require("config")
const port = config.get("app.PORT")
const server = http.createServer(app)
server.listen(port, ()=>{
     console.log(`server listening on port: ${port}`);     
})
