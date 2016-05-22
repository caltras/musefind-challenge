(function(w,app,angular,undefined){
    
    var AccountSetupController = function($scope,$location,accountService) {
        $scope.titles = ["CREATE YOUR ACCOUNT","BRAND DETAILS","ABOUT YOUR BRAND"];
        $scope.subTitles = ["Some basic information.","We will ever sell it","We want to know you better."];

        $scope.title = "CREATE YOUR ACCOUNT";
        $scope.subTitle = "Some basic information";
        $scope.state = 'basic';
        $scope.steps = ['basic','brand-details','submit'];
        $scope.countStep=0;
        $scope.account = {};
        $scope.next = function(step) {
            if($scope.validate()){
                $scope.state = $scope.steps[++$scope.countStep];
                $scope.setTitle();
            }else{
                alert("Verify the required fields");
            }
        };
        $scope.prev = function(step) {
            if($scope.validate()){
                $scope.state = $scope.steps[--$scope.countStep];
                $scope.setTitle();
            }
        };
        $scope.save = function(){
            if($scope.validate()){
                $scope.progress=true;
                accountService.save($scope.account).then(function(response){
                    alert("Success");
                    window.location.href="/home/";
                    $scope.progress=false;    
                },function(e){
                    alert("Error");
                    $scope.progress=false;    
                });
            }else{
                alert("Verify the required fields");
            }
        };
        $scope.setTitle = function(){
            $scope.title = $scope.titles[$scope.countStep];
            $scope.subTitle = $scope.subTitles[$scope.countStep];
        };
        $scope.validate = function(){
            if($scope.state==='basic'){
                return $scope.validateBasic();
            }else{
                if($scope.state==='brand-details'){    
                    return $scope.validateBrand();
                }else{
                    return $scope.validateSubmit();
                }
            }
        };
        $scope.validateBasic = function(){
            var isValid = true;
            if(window.isNullOrUndefined($scope.account.name)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.position)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.email)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.password) || window.isNullOrUndefined($scope.account.confirmPassword)){
                isValid=false;
            }else{
                if($scope.account.password !== $scope.account.confirmPassword){
                    isValid=false;
                    alert("The password fields are differents.");
                }
            }
            return isValid;
        };
        $scope.validateBrand = function(){
            var isValid = true;  
            if(window.isNullOrUndefined($scope.account.companyName)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.phone)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.address1)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.zip)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.city)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.state)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.country)){
                isValid=false;
            }
            return isValid;
        };
        $scope.validateSubmit = function(){
            var isValid = true;  
            if(window.isNullOrUndefined($scope.account.verticalPosition)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.experiences)){
                isValid=false;
            }
            if(window.isNullOrUndefined($scope.account.measureSuccess)){
                isValid=false;
            }
            return isValid;
        };
    };
    AccountSetupController.$injet = ["$scope","$location","accountService"];
    app.controller("accountSetupController", AccountSetupController);
    
})(window, window.app,angular);