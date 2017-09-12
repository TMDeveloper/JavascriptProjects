(function () {
 "use strict";
    
var app = angular.module("WikiApp", [])
.controller("MainController", MainController)
.service("WikiSearchService", WikiSearchService)
.directive("searchResults", ResultsDirective)
.constant("APIBasePath", "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=");

MainController.$inject = ["WikiSearchService"];
function MainController(WikiSearchService){
    var search = this;
    
    search.getResults = function(){
        search.results = [];
        
        var promise = WikiSearchService.getResults(search.searchText);
        promise.then(function(response){
           search.results = response;
        })
        
        .catch(function(error){
			console.log("Something went wrong...", error);
		});
    };
};

WikiSearchService.$inject = ["$http", "APIBasePath"];
function WikiSearchService($http, ApiBasePath) {
    var service = this;
    var formatType = "&format=json&origin=*";
    var page = "https://en.wikipedia.org/?curid=";

    service.getResults = function (searchTerm) {
        return $http({
            restrict: "E",
            method: "GET",
            url: (ApiBasePath + searchTerm + formatType)
        })
        .then(function (result) {
            var dataArray = [];
            var dataArray = result.data.query.pages;
            var results = [];
            angular.forEach(dataArray, function(v,k)  {
                results.push({title: v.title, body: v.extract, page: page + v.pageid});
            });
            return results;
        })
        .catch(function(error){
            console.log("Something went wrong...");
        
        });
    }
};
    
function ResultsDirective () {
   return {
        restrict: "E",
        templateUrl: "resultsView.html",
        scope: {
        results: "<"
        }
   };
}
    
}());