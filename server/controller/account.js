var controller = {
    "get" : {
        "/" : function(req,res){
            res.end();
        }
    },
    "put": {
        "/" : function(req,res){
            controller.dataSource.save('accounts',req.body.data,{flush:true}).then(function(response){
                res.status(200);
                req.user = response;
                res.json(response);
            },function(error){
                res.status(400);
                res.json(error);
            });
        }
    }
};
module.exports = controller;