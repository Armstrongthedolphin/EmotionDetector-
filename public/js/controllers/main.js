// js/controllers/main.js

angular.module('projectController', [])

    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all projects and show them
        $http.get('/api/projects')
                .success(function(data) {
                        $scope.projects = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        // when submitting the add form, send the text to the node API
        $scope.createProject = function() {
                $http.post('/api/projects', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.projects = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a project after checking it
        $scope.deleteProject = function(id) {
                $http.delete('/api/projects/' + id)
                        .success(function(data) {
                                $scope.projects = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        
       
    });
