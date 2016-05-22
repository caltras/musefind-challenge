(function(w, a, route, undefined) {
    /*start module*/
    var app = a.module('museFind', ['ngRoute','ngMaterial']);
    app.config(function($mdThemingProvider, $mdDateLocaleProvider, $routeProvider) {
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'b55c6f',
            '600': 'bf5068',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light', // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'
            ],
            'contrastLightColors': undefined // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('amazingPaletteName');
            
        route($routeProvider);
    });
    window.isNullOrUndefined = function(obj){
        return !obj || obj === undefined;
    };
    window.app = app;
    
})(window, angular,route);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['museFind']);
});