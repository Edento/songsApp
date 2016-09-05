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
    }];

    var self = this;
    self.current = {
        artist: '',
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

                if (response.resultCount < 4) {
                    // not enough albums to show...
                    // HOW TO RECALL THAT?

                } else {

                    self.current.artist = response.results[0].artistName;
                    var len = response.results.length;
                    self.current.albums = getRandomAlbums(response.results.splice(1, len - 1));
                    callback();
                }
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

        console.log('random array is:');
        console.log(indexes);
        return indexes;



    };



}]);