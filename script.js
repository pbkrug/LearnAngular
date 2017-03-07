(function () {

    //Define the module for this application
    var app = angular.module("gitHubViewer");

    var MainController = function ($scope, $location, $log) {

        $scope.search = function (username) {
            $log.info("script.js - setting location path to /user/...");
            $location.path("/user/" + username);
        };

        $scope.username = "angular";
    };

    app.controller("MainController", MainController);

}());