
var mod=angular.module('app',[
	'ngRoute',

	]);


//Do configuration and routing here
mod.config(function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when("/cursos",{
            controller: "cursoList",
            templateUrl: "templates/cursolist.html"
        })
		.when("/cursos/:cursoId",{
            controller: "cursoDet",
            templateUrl: "templates/cursodet.html"
        })
        .otherwise({
        	redirectTo:'/cursos'
        })
        ;
 
});

mod.controller('cursoList', function ($scope, cursoService){
	cursoService.getCursos();
    $scope.cursos= cursoService.cursos;
	

    $scope.addNewCurso = function(movieName){
        var curso = {nombre: movieName};
        cursoService.addNewCurso(curso);
    }
});

mod.controller('cursoDet', function ($scope, $routeParams){
		
		$scope.curso= $routeParams.cursoId;
		
});




mod.factory("cursoService", function($http){
    var _movies = [];
 
    var _getMovies = function(){
 
        $http.get("cursos.json")
            .then(function(results){
                //Success
                angular.copy(results.data, _movies); //this is the preferred; instead of $scope.movies = result.data
            }, function(results){
                //Error
            })
    }

    var _addNewMovie = function(movie){
        _movies.splice(0, 0, movie);
    }
 
    return{
        cursos: _movies,
        getCursos: _getMovies,
        addNewCurso: _addNewMovie
    };
});
