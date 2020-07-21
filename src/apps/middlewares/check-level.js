module.exports = function(req, res, next) {
    var sidebar
    var name
    var id_local
    if (req.session.user) {
        sidebar = req.session.user.user_level
        name = req.session.user.user_fullname
        id_local = req.session.user._id
            //console.log(req.session.user._id)
    } else {
        sidebar = 2
    }
    res.locals.sidebar = sidebar
    res.locals.name = name
    res.locals.id_local = id_local
    next()
}