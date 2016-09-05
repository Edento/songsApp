songsApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/game.html',
            controller: 'gameCtrl'
        })
        .when('/results', {
            templateUrl: 'pages/results.html',
        });
});