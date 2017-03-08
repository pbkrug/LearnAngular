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
                    //$log.info("Repository objects: " + response.data);
                    return response.data;
                    });
            };

        var getRepoDetails = function (username, reponame) {
            var repo;
            var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
            $log.info("github.js - Retrieving repository for user '" + username + "'");
            $log.info("github.js - Repo URL is '" + repoUrl + "'");
            return $http.get(repoUrl)
                .then(function (response) {
                    $log.info("Repository object: " + response.data);
                    repo = response.data;
                    return $http.get(repoUrl + "/contributors");
                })
                .then(function (response) {
                    repo.contributors = response.data;
                    return repo;
                });

        };

        //Reveal public pointers to private functions and properties
        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails
        };
    };

    //Create a reference to the viewer module
    var module = angular.module("gitHubViewer");
    module.factory("github", github);

}());