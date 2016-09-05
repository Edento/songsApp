// Controllers
songsApp.controller('gameCtrl', ['$scope', '$routeParams', 'itunesService', function($scope, $routeParams, itunesService) {

    $scope.itunesService = itunesService;
    $scope.userAnswer = null;

    var newGame = function() {
        $scope.game = {
            currentRound: {
                artist: '',
                albums: [],
                attempt: 1
            },
            round: 0,
            score: 0,
            isOver: false,
            userDidGuess: [],
            userDidntGuess: []

        };
    };

    var newRound = function() {

        if ($scope.game.round == 5) {
            $scope.game.isOver = true;
            return;
        }

        itunesService.getAlbumsData(updateRoundDataCallback);
    };

    var updateRoundDataCallback = function() {
        var currentRound = $scope.game.currentRound;
        currentRound.artist = itunesService.current.artist;
        currentRound.albums = itunesService.current.albums;
        currentRound.attempt = 1;
        $scope.game.round++;
    };

    $scope.play = function() {
        newGame();
        newRound();
    };

    $scope.checkUserAnswer = function(userAnswer) {

        if (userAnswer == $scope.game.currentRound.artist) {
            handleCorrectAnswer();
            $scope.userAnswer = '';
        } else {
            $scope.userAnswer = '';
            handleWrongAnswer();

        }
        // $scope.userAnswer = '';
    };

    var handleWrongAnswer = function() {

        if ($scope.game.currentRound.attempt == 3) {

            $scope.game.userDidntGuess.push($scope.game.currentRound.artist);
            newRound();
            return;
        }
        $scope.game.currentRound.attempt++;
    };

    var handleCorrectAnswer = function() {
        console.log("user answer before: " + $scope.userAnswer)
        $scope.userAnswer = '';
        console.log("user answer after" + $scope.userAnswer);
        $scope.game.userDidGuess.push($scope.game.currentRound.artist);
        addScore();
        newRound();
    };

    $scope.getCurrentAttemptScore = function() {

        return getScoreByAttempt($scope.game.currentRound.attempt);

    };
    var addScore = function() {
        $scope.game.score += getScoreByAttempt($scope.game.currentRound.attempt);
    };

    var getScoreByAttempt = function(attempt) {
        var scores = {
            "1": { points: 5 },
            "2": { points: 3 },
            "3": { points: 1 }
        };
        return scores[attempt].points;
    };
    $scope.play();

    $scope.getScoreByAttempt = getScoreByAttempt;


}]);