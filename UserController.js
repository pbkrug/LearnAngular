(function () {

    var app = angular.module("gitHubViewer");

    var UserController = function ($scope, github, $routeParams, $log) {

        var onUserComplete = function (data) {
            $scope.user = data;
            $log.info("UserController::onUserComplete - data.name: '" + data.name + "'");
            $log.info("UserController::onUserComplete - calling github.getRepos....");
            github.getRepos($scope.user).then(onRepos, onError);
        };

        var onRepos = function (data) {
            $scope.repos = data;
            $log.info("UserController::onRepos - response.data: ");
            $scope.error = null;
        };

        var onError = function (reason) {
            $log.info("UserController::onError - could not retrieve data for '" + $scope.username + "'");
            $log.info("UserController::onError - " + reason.statusText);
            $scope.error = "Could not retrieve data for user: " + $scope.username;
            $scope.user = null;
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        $log.info("UserController - calling github.getUser...");
        github.getUser($scope.username).then(onUserComplete, onError);
    };

    app.controller("UserController", UserController);

}());