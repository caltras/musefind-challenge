module.exports = {
    express : {
        views: "./client/",
        statics: "./client/",
        expressSession : "MuseFind Challenge"
    },
    dataBaseProvider : "memory_fs",
    hasAuthentication:true,
    login : {
        action : "/login/auth",
        failureRedirect:"/login/",
        successRedirect : "/home/"
    }
};