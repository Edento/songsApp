// SERVICES

songsApp.service('itunesService', ['$resource', function($resource) {


    var entity = "album";
    var limit = "10";
    var artists = [{
        name: "Jack Jackson",
        id: "909253"
    }, {
        name: "Michael Jackson",
        id: "32940"
    }, {
        name: "The Beatles",
        id: "136975"
    }, {
        name: "Bruno Mars",
        id: "278873078"
    }, {
        name: "Guns N' Roses",
        id: "106621"
    }, {
        name: "Amy Winehouse",
        id: "13125609"
    }, {
        name: "Arctic Monkeys",
        id: "62820413"
    }, {
        name: "Depeche Mode",
        id: "148377"
    }, {
        name: "Red Hot Chili Peppers",
        id: "889780"
    }, {
        name: "Foo Fighters",
        id: "6906197"
    }, {
        name: "Justin Timberlake",
        id: "398128"
    }, {
        name: "M83",
        id: "46086389"
    }, {
        name: "Maroon 5",
        id: "1798556"
    }, {
        name: "Muse",
        id: "1093360"
    }, {
        name: "U2",
        id: "78500"
    }, {
        name: "Owl City",
        id: "264481094"
    }, {
        name: "Queen",
        id: "3296287"
    }, {
        name: "The Rolling Stones",
        id: "1249595"
    }, {
        name: "Scorpions",
        id: "602212"
    }, {
        name: "Led Zeppelin",
        id: "994656"
    }, {
        name: "Bob Dylan",
        id: "462006"
    }, {
        name: "Rihanna",
        id: "63346553"
    }, {
        name: "Green Day",
        id: "954266"
    }];

    var self = this;
    self.current = {
        artist: '',
        id: '',
        albums: []
    };

    var getRandomArtistId = function() {
        return artists[Math.floor(Math.random() * artists.length)].id;
    };

    this.getAlbumsData = function(callback) {

        var artistId = getRandomArtistId();
        var itunesUrl = "https://itunes.apple.com/lookup";
        var itunesAPI =
            $resource(itunesUrl, { callback: "JSON_CALLBACK" }, {
                get: { method: "JSONP" }
            });

        itunesAPI.get({
                id: artistId,
                entity: entity,
                limit: limit,
            },
            function(response) {
                self.current.artist = response.results[0].artistName;
                self.current.id = response.results[0].artistId;
                var len = response.results.length;
                self.current.albums = getRandomAlbums(response.results.splice(1, len - 1));
                callback();
            }
        );
    };

    var getRandomAlbums = function(albums) {

        var indexes = [];
        while (indexes.length < 3) {
            var randomnumber = Math.floor(Math.random() * albums.length);
            var found = false;
            for (var i = 0; i < indexes.length; i++) {
                if (indexes[i] == randomnumber) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                // indexes[indexes.length] = randomnumber;
                indexes.push(randomnumber);
            }
        }

        for (var i = 0; i < indexes.length; i++) {
            indexes[i] = albums[i];
        }
        return indexes;



    };



}]);