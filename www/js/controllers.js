angular.module('starter.controllers', ['ionic','ngCordova'])
    .run(function($rootScope) {
        $rootScope.places = [
            {
                index: 0,
                name: "Unit 1 Christian Hall",
                image: "http://www.ehdd.com/sites/ehdd2/images/3187/UCB1&2Courtyard3.jpg",
                activity: "Living Space",
                likes: 5222,
                dislikes: 2231,
                flagged: 0
            },
            {
                index: 1,
                name: "Unit 1 Slottman Mini-Suite",
                image: "https://c1.staticflickr.com/5/4105/5051519361_6e18ec0907_b.jpg",
                activity: "Living Space",
                likes: 3122,
                dislikes: 4232,
                flagged: 0
            },
            {
                index: 2,
                name: "Wheeler Hall Auditorium",
                image: "https://ets.berkeley.edu/sites/default/files/images/wheeler150.jpg",
                activity: "Learning",
                likes: 32034,
                dislikes: 1590,
                flagged: 0
            },
            {
                index: 3,
                name: "Channing and Haste Tennis Courts",
                image: "http://media.ussportscamps.com/assets/camps/tennis/cal-berkeley/nike-tennis-camp-cal-2.jpg",
                activity: "Tennis",
                likes: 345,
                dislikes: 124,
                flagged: 0
            }
        ];
        $rootScope.placesSwiped = [];
        $rootScope.newCard = {
            index: $rootScope.places.length,
            name: "",
            image: "",
            activity: "",
            likes: 0,
            dislikes: 0,
            flagged: 0
        };
        $rootScope.pastingURL = false;
        $rootScope.placesCopy = [];
        $rootScope.currentActivity = null;
        $rootScope.activitiesSwiped = [];
    })

.controller('DashCtrl', function($scope, $rootScope, $cordovaCamera) {
      var shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
        
        var previousLastIndex = 0;
      $scope.placesCopy = shuffle($scope.placesCopy.concat($scope.places.slice(previousLastIndex, $scope.places.length)));
      $scope.currentPlace = $scope.placesCopy.pop();
        $scope.emptyList = function() {
            return $scope.placesCopy.length === 0 && $scope.currentPlace === undefined;
        };
        $scope.newPlaces = function() {
        $scope.placesCopy = shuffle($scope.placesCopy.concat($scope.places.slice(previousLastIndex, $scope.places.length)));
      };
      var setCurrentPlace = function() {
          $scope.currentPlace = $scope.placesCopy.pop();
          for (var i = 0; i < $scope.placesSwiped.length; i++) {
              console.log($scope.places[i].name, $scope.places[i].likes, $scope.places[i].dislikes);
          }
      };
        <!-- Left and right swiping functions -->
      $scope.swipeLeft = function () {
        $scope.currentPlace.dislikes += 1;
          $scope.placesSwiped.push($scope.currentPlace.index);
          var actObj = $scope.currentPlace.activity;
          if (!($scope.activitiesSwiped.indexOf(actObj) > -1)) {
              $scope.activitiesSwiped.push(actObj);
          }
        setCurrentPlace();
      };
      $scope.swipeRight = function() {
        $scope.currentPlace.likes += 1;
          $scope.placesSwiped.push($scope.currentPlace.index);
          var actObj = $scope.currentPlace.activity;
          if (!($scope.activitiesSwiped.indexOf(actObj) > -1)) {
              $scope.activitiesSwiped.push(actObj);
          }
        setCurrentPlace();
      };
        <!-- ---------------------------------------------------------- -->
      $scope.listContainsItems = function() {
        $scope.currentPlace != null;
      };
        $scope.flag = function() {
            $scope.currentPlace.flagged += 1;
            $scope.swipeLeft();
        }
        $scope.editingNewCard = false;
        $scope.startEditingNewCard = function() {
            $scope.editingNewCard = true;
        }

        $scope.submitNewCard = function() {
            if (($scope.newCard.name === "" || $scope.newCard.image === "http://www.saanviorganics.com/gallery_icon.jpg") || $scope.newCard.activity === "") {
                alert("Error: Make sure you have completed all the fields and uploaded a photo");
                return;
            }
            $scope.newCard.index = $scope.places.length;
            $scope.newCard.likes = 0;
            $scope.newCard.dislikes = 0;
            $scope.newCard.flagged = 0;
            $scope.placesCopy.push($scope.currentPlace);
            $scope.currentPlace = $scope.newCard;
            $scope.places.push($scope.newCard);
            $scope.newCard = {
                index: $scope.places.length,
                name: "",
                image: "",
                activity: "",
                likes: 0,
                dislikes: 0,
                flagged: 0
            };
            $scope.editingNewCard = false;
            $scope.pastingURL = false;
        }
    })
    //
    //.filter('activityFilter', function() {
    //    return function(input, scope1, scope2) {
    //        return scope1[input].activity === scope2;
    //    };
    //})

    .controller('PictureCtrl', function($scope, $cordovaCamera) {
        $scope.takePicture = function() {
            var options = {
                quality : 75,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // An error occured. Show a message to the user
            });
        };

        document.addEventListener("deviceready",onDeviceReady,false);

        // device APIs are available
        //
        function onDeviceReady() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        }

        // Called when a photo is successfully retrieved
        //
        function onPhotoDataSuccess(imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);

            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        // Called when a photo is successfully retrieved
        //
        function onPhotoURISuccess(imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);

            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }
        // A button will call this function
        //
        $scope.getPhoto = function (source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                destinationType: destinationType.FILE_URI,
                sourceType: source });
        }

        // Called if something bad happens.
        //
        function onFail(message) {
            alert('Failed because: ' + message);
        }

        $scope.urlPaste = function() {
            $scope.pastingURL = true;
        }
    })

    .controller('StatsCtrl', function($scope, $rootScope, $ionicPopover) {
        $scope.totalVotes = function(place) {
            return place.likes + place.dislikes;
        };
        $scope.likeBarStyle = function(place) {
            if (place.dislikes === 0) {
                return {"background": "#33CC00",
                    "width": place.likes/$scope.totalVotes(place) * 100 + '%',
                    "height": "3vw",
                    "display" : "inline-block",
                    "font-size" : "2.5vw",
                    "color" : "white",
                    "padding-left" : "1vw",
                    "text-align" : "left",
                    "border-radius":".3vw",
                    "font-weight": "bold"
                };
            }
            return {"background": "#33CC00",
                "width": place.likes/$scope.totalVotes(place) * 100 + '%',
                "height": "3vw",
                "display" : "inline-block",
                "font-size" : "2.5vw",
                "color" : "white",
                "padding-top" : "1vw",
                "padding-left" : "1vw",
                "text-align" : "left",
                "border-top-left-radius":".3vw",
                "border-bottom-left-radius" : ".3vw",
                "font-weight": "bold"
            };
        };
        $scope.dislikeBarStyle = function(place) {
            if (place.likes === 0) {
                return {"background": "#FF3333",
                    "width": place.dislikes/$scope.totalVotes(place) * 100 + '%',
                    "height": "3vw",
                    "display" : "inline-block",
                    "font-size" : "2.5vw",
                    "color" : "white",
                    "padding-top" : "1vw",
                    "padding-right" : "1vw",
                    "text-align" : "right",
                    "border-radius":".3vw",
                    "font-weight": "bold"
                };
            }
            return {"background": "#FF3333",
                "width": place.dislikes/$scope.totalVotes(place) * 100 + '%',
                "height": "3vw",
                "display" : "inline-block",
                "font-size" : "2.5vw",
                "color" : "white",
                "padding-top" : "1vw",
                "padding-right" : "1vw",
                "text-align" : "right",
                "border-top-right-radius":".3vw",
                "border-bottom-right-radius" : ".3vw",
                "font-weight": "bold"
            };
        };
        $scope.moreLiked = function(place) {
            return place.likes/$scope.totalVotes(place) * 100 > 50;
        };
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });

})

    .controller('PopoverCtrl', function($scope) {
        $scope.setCurrentActivity = function(place) {
            $scope.currentActivity = place;
            //console.log("currentActivity: ", $scope.currentActivity);
        }
    })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
