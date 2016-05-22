var _ = require("lodash");
var controller = {
    "get":{
        "create":function(req,res){
            res.render("views/campaign/create.html");
        }
    },
    "put": {
        "/" : function(req,res){
            var campaign = req.body.data;
            campaign.verticals = _.map(_.filter(campaign.verticals,function(v){
               return  !!v.checked;
            }),"name");
            
            controller.dataSource.save('campaign',campaign,{flush:true}).then(function(response){
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