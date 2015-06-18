angular.module('starter.controllers', [])
    .run(function($rootScope) {
        $rootScope.places = [
            {
                index: 0,
                name: "Unit 1",
                image: "http://www.ehdd.com/sites/ehdd2/images/3187/UCB1&2Courtyard3.jpg",
                part: "Christian Hall",
                likes: 0,
                dislikes: 0,
                flagged: 0
            },
            {
                index: 1,
                name: "Unit 1 Slottman",
                image: "https://c1.staticflickr.com/5/4105/5051519361_6e18ec0907_b.jpg",
                part: "Mini-Suite",
                likes: 0,
                dislikes: 0,
                flagged: 0
            }
        ];
        $rootScope.placesSwiped = [];
    })

.controller('DashCtrl', function($scope, $rootScope) {
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
        $scope.placesCopy = [];
      $scope.placesCopy = shuffle($scope.placesCopy.concat($scope.places.slice(previousLastIndex, $scope.places.length)));
      $scope.currentPlace = $scope.placesCopy.pop();
      $scope.listEmpty = "No";
      $scope.newPlaces = function() {
        $scope.placesCopy = shuffle($scope.placesCopy.concat($scope.places.slice(previousLastIndex, $scope.places.length)));
      };

      var setCurrentPlace = function() {
        if ($scope.placesCopy.length == 0) {
          $scope.listEmpty = "Yes";
        } else {
          $scope.listEmpty = "No";
          $scope.currentPlace = $scope.placesCopy.pop();
        }
          for (var i = 0; i < $scope.placesSwiped.length; i++) {
              console.log($scope.places[i].name, $scope.places[i].likes);
          }
      };
        <!-- Left and right swiping functions -->
      $scope.swipeLeft = function () {
        $scope.currentPlace.dislikes += 1;
          $scope.placesSwiped.push($scope.currentPlace);
        setCurrentPlace();
      };
      $scope.swipeRight = function() {
        $scope.currentPlace.likes += 1;
          $scope.placesSwiped.push($scope.currentPlace);
        setCurrentPlace();
      };
        <!-- ---------------------------------------------------------- -->
      $scope.listContainsItems = function() {
        $scope.currentPlace != null;
      };

    })

    .controller('StatsCtrl', function($scope, $rootScope) {

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
