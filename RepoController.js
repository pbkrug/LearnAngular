(function () {

    var app = angular.module("gitHubViewer");

    var RepoController = function ($scope, github, $routeParams, $log) {

        var onRepo = function (data) {
            $scope.repo = data;
            $log.info("RepoController::onRepo - response.data: ");
        };

        var onError = function (reason) {
            $scope.error = reason;
            $log.info("RepoController::onError - could not retrieve data for '" + $scope.username + "'");
            $log.info("RepoController::onError - " + reason.statusText);
            //$scope.error = "Could not retrieve data for user: " + $scope.username;
        };

        var reponame = $routeParams.reponame;
        var username = $routeParams.username;

        github.getRepoDetails(username, reponame)
            .then(onRepo, onError);


    };

    app.controller("RepoController", RepoController);

}());