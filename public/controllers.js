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
            userDidntGuess: [],
            usedArtistsId: []

        };
    };

    var newRound = function() {

        if ($scope.game.round == 5) {
            $scope.game.isOver = true;
            return;
        }
        itunesService.getAlbumsData(validateAndUpdateData);

    };

    var isEnoughAlbumsForArtist = function() {
        return (itunesService.current.albums.length >= 3);
    };

    var isArtistAlreadyUsed = function() {
        for (var i = 0; i < $scope.game.usedArtistsId.length; i++) {
            var id = $scope.game.usedArtistsId[i];
            if (id == itunesService.current.id) {
                return true;
            }
        }
        return false;
    };

    var updateRoundData = function() {
        $scope.game.usedArtistsId.push(itunesService.current.id);
        var currentRound = $scope.game.currentRound;
        currentRound.artist = itunesService.current.artist;
        currentRound.albums = itunesService.current.albums;
        currentRound.attempt = 1;
        $scope.game.round++;
    };

    /**
     * This method validates the itunes API results, and updates the round if valid
     * 1. checks if the artist even has 3 albums to show, if not then another API call is made
     * 2. checks if the artist has been already shown in this game, if it did -> another API call
     * 3. when a valid artist is received, it updates the round data and the game continues.
     */
    var validateAndUpdateData = function() {

        if (!isEnoughAlbumsForArtist) {
            itunesService.getAlbumsData(validateAndUpdateData);
            return;
        }

        var alreadyUsedThisArtist = isArtistAlreadyUsed();
        if (alreadyUsedThisArtist) {
            itunesService.getAlbumsData(validateAndUpdateData);
        } else {
            updateRoundData();
        }
    };

    $scope.play = function() {
        newGame();
        newRound();
    };

    $scope.checkUserAnswer = function(userAnswer) {
        if (userAnswer == $scope.game.currentRound.artist) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
        $scope.userAnswer = '';
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
        $scope.userAnswer = '';
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