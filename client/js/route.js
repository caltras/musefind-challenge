function route(provider){
    provider
        .when('/admin', {
            templateUrl : '/home/admin'
        })
        .when("/campaign/create",{
            templateUrl : '/campaign/create'
        })
        .otherwise({redirectTo: '/'});
    return provider;
}