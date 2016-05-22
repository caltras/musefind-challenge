(function(w,app,angular,_,undefined){
    
    var CampaignController = function($scope,campaignService) {
        $scope.titles = ["Let's Begin!","Select the vertical for this campaign","Influencer Details","Post Details","Summary"];
        $scope.subTitles = ["Start by entering your campaign title.","Select one or multiple categories that best describe your campaign from the  list",
        "Details about the influencer you looking for","Details About the posts your are looking for",
        "Review your campaign, make sure it's everything you've ever wanted it  to be (and more), and don't forget to accept the Musefind Terms & Conditions! We can't wait work with you!"];
        $scope.icons = ["rocket","arrows-v","user","hashtag","check-square"];
        $scope.campaign = {
            tags : [],
            verticals:[{name:"Fashion/Apparel"},{name:"Baby"},{name:"Pets"},{name:"Health"},{name:"Food"},
            {name:"Fitness"},{name:"Sports"},{name:"Beauty/Cosmetics"},{name:"Tech"},{name:"Jewelry/Acessories"},{name:"CPG"}]
        };
        $scope.title = $scope.titles[0];
        $scope.subTitle = $scope.subTitles[0];
        $scope.steps = ['info','vertical','influencer','details','finish'];
        $scope.state = $scope.steps[0];
        $scope.countStep=0;
        $scope.setTitleLogo("Musefind","dark") ;
        $scope.progress = 20;
        $scope.brands = [{id:"1",name:"SDF"}];
        $scope.next = function(step) {
            //if($scope.validate()){
                $scope.state = $scope.steps[++$scope.countStep];
                $scope.setTitle();
            /*}else{
                alert("Verify the required fields");
            }*/
        };
        $scope.prev = function(step) {
            //if($scope.validate()){
                $scope.state = $scope.steps[--$scope.countStep];
                $scope.setTitle();
            //}
        };
        $scope.setTitle = function(){
            $scope.title = $scope.titles[$scope.countStep];
            $scope.subTitle = $scope.subTitles[$scope.countStep];
            $scope.icon=$scope.icons[$scope.countStep];
            $scope.progress = ($scope.countStep+1)*20;
        };
        $scope.toStringTags = function(list){
            return list.join(",");
        };
        $scope.toStringVerticals = function(list){
            return _.map(_.filter($scope.campaign.verticals,function(v){
               return  !!v.checked;
            }),"name").join(',');
        };
        $scope.save = function(){
            $scope.campaign.verticals = $scope.campaign.verticals;
            campaignService.save($scope.campaign).then(function(){
                alert("Success");
            },function(){
                alert('Error');
            });
        };
    };
    CampaignController.$injet = ["$scope",'campaignService'];
    app.controller("campaignController", CampaignController);
    
})(window, window.app,angular,_);