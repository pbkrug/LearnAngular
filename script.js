// Code goes here

(function () {


    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
        };

        var onError = function (reason) {
            $scope.error = "Could not retrieve data on the user."
        };

        $http.get("https://api.github.com/users/pbkrug")
            .then(onUserComplete, onError);


        $scope.message = "Simple GitHub User Viewer";


    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());