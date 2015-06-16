angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
      var previousLastIndex = 0;
      $scope.placesCopy = [];
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
      $scope.places = [
        {
          name: "Unit 1",
          image: "http://www.ehdd.com/sites/ehdd2/images/3187/UCB1&2Courtyard3.jpg",
          part: "Christian Hall",
          likes: 0,
          dislikes: 0,
            swiped: false
        },
        {
          name: "Unit 1 Slottman",
          image: "https://c1.staticflickr.com/5/4105/5051519361_6e18ec0907_b.jpg",
          part: "Mini-Suite",
          likes: 0,
          dislikes: 0,
            swiped: false
        }
      ];
      $scope.placesCopy = shuffle($scope.placesCopy.concat($scope.places.slice(previousLastIndex, $scope.places.length)));
      $scope.currentPlace = $scope.placesCopy.pop();
      $scope.listEmpty = "No";
      $scope.newPlaces = function() {
        $scope.placesCopy = shuffle($scope.placesCopy.concat($scope.places.slice(previousLastIndex, $scope.places.length)));
      };

        <!-- Update place objects to show that they have been swiped before -->
        $scope.trueSwipe = function(place) {
            console.log("truSwipe");
            place.swiped = true;
        };
        $scope.isSwiped = function(place) {
            return place.swiped;
        };
        <!-- ------------------------------------------------------------- -->

      var setCurrentPlace = function() {
        if ($scope.placesCopy.length == 0) {
          $scope.listEmpty = "Yes";
        } else {
          $scope.listEmpty = "No";
          $scope.currentPlace = $scope.placesCopy.pop();
        }
          for (var place in $scope.places) {
              console.log("", place.name, place.swiped);
          }
      };
        <!-- Left and right swiping functions -->
      $scope.swipeLeft = function () {
        $scope.currentPlace.dislikes += 1;
          console.log($scope.currentPlace.name + ": -" + $scope.currentPlace.dislikes);
          $scope.trueSwipe($scope.currentPlace);
        setCurrentPlace();
      };
      $scope.swipeRight = function() {
        $scope.currentPlace.likes += 1;
          console.log($scope.currentPlace.name + ": " + $scope.currentPlace.likes);
          $scope.trueSwipe($scope.currentPlace);
        setCurrentPlace();
      };
        <!-- ---------------------------------------------------------- -->
      $scope.listContainsItems = function() {
        $scope.currentPlace != null;
      };

    })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
