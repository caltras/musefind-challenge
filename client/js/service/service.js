(function(w, app) {
    function genericRest(action, $http) {
        return {
            update: function(obj) {
                return $http.post("/" + action + "/" + obj.id + "/update", {
                    data: obj
                });
            },
            save: function(obj) {
                return $http.put("/" + action + "/", {
                    data: obj
                });
            },
            delete: function(id) {
                return $http.delete("/" + action + "/" + id);
            },
            list: function(criterias, maxResults, offset) {
                return $http.post("/" + action + "/list", {
                    criterias: criterias,
                    maxResults: maxResults,
                    offset: offset
                });
            }
        };
    }
    app.service("accountService", ["$http", function($http) {
        var rest = genericRest("account", $http);
        return rest;
    }]);
    app.service("campaignService", ["$http", function($http) {
        var rest = genericRest("campaign", $http);
        return rest;
    }]);
    
})(window, window.app);