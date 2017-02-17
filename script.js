// Code goes here

(function () {


    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, github, $log, $anchorScroll, $location) {

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        };


        var onRepos = function (response) {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();
            $scope.error = null;
        };

        var onError = function (reason) {
            $scope.error = "Could not retrieve data for user: " + $scope.username;
            $scope.user = null;
        };

        $scope.search = function (username) {
            $log.info("Searching for: " + username);
            github.getUser(username).then(onUserComplete, onError);
        };


        $scope.username = "angular";
        $scope.message = "Simple GitHub User Viewer";
        $scope.repoSortOrder = "-stargazers_count";


    };

    app.controller("MainController", MainController);

}());