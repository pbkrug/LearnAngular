// Code goes here

(function () {


    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };


        var onRepos = function (response) {
            $scope.repos = response.data;
            $scope.error = null;
        };

        var onError = function (reason) {
            $scope.error = "Could not retrieve data for user: " + $scope.username;
            $scope.user = null;
        };

        $scope.search = function (username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };


        $scope.username = "angular";
        $scope.message = "Simple GitHub User Viewer";
        $scope.repoSortOrder = "-stargazers_count";


    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());