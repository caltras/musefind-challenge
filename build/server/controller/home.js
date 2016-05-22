module.exports = {
    "get" : {
        "/":function(req,res){
            res.render("views/home/index.html",{user:req.user});
        },
        "/admin":function(req,res){
            res.send("Admin");
        }
    },
    "put" : {
        "/":function(req,res){
            
        }
    }
};