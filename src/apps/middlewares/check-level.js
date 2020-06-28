module.exports = function(req, res, next) {
    var sidebar
    var name
    if (req.session.user) {
        sidebar = req.session.user.user_level
        name = req.session.user.user_fullname
    } else {
        sidebar = 2
    }
    res.locals.sidebar = sidebar
    res.locals.name = name
    next()
}