(function () {

    //When this function gets invoked, it returns an object with an API
    //'Revealing Module' pattern
    var github = function ($http, $log) {

        var getUser = function (username) {
            $log.info("github.js - Searching for user '" + username + "'");
            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        var getRepos = function (user) {
            $log.info("github.js - Retrieving repositories for user '" + user.name + "'");
            $log.info("github.js - Repos URL is '" + user.repos_url + "'");
            return $http.get(user.repos_url)
                .then(function (response) {
                    $log.info("Repository objects: " + response.data);
                    return response.data;
                    });
            };

        //Reveal public pointers to private functions and properties
        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    //Create a reference to the viewer module
    var module = angular.module("gitHubViewer");
    module.factory("github", github);

}());