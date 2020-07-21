const ejs = require("ejs")
const path = require("path")

exports.renderHtml = async (req, view, data ) => {
     const viewPath = req.app.get("views")
     const html = await ejs.renderFile(path.join(viewPath, `${view}.ejs`), data)
     return html
 }