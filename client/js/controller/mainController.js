(function(w,app,angular,undefined){
    
    var MainController = function($scope) {
        $scope.titleLogo = "Musefind" ;
        $scope.titleClazz="";
        $scope.setTitleLogo = function(title,clazz){
            $scope.titleLogo = title;    
            $scope.titleClass = clazz;
        };
    };
    MainController.$injet = ["$scope"];
    app.controller("mainController", MainController);
    
})(window, window.app,angular);