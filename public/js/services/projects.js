// js/services/projects.js
angular.module('projectService', [])

    // super simple service
    // each function returns a promise object
    .factory('Projects', function($http) {
        return {
            get : function() {
                return $http.get('/api/projects');
            },
            create : function(projectData) {
                return $http.post('/api/projects', projectData);
            },
            delete : function(id) {
                return $http.delete('/api/projects/' + id);
            }
        }
    });
