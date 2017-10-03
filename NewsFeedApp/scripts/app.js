(function () {
    'use strict';
    
angular.module('NewsFeedApp', [])
.controller('MainController', MainController)
.service('GetNewsService', GetNewsService)
.directive('articlesCards', ArticlesCardsDirective)
.directive('sourcesCards', SourcesCardsDirective)
.constant('SourcesAPIBasePath', "https://newsapi.org/v1/sources?category=")
.constant('ArticlesAPIBasePath', "https://newsapi.org/v1/articles?source=");
    
    MainController.$inject = ['GetNewsService'];
    function MainController(GetNewsService) {
        var ctrl = this;
        ctrl.sources = []; 
        ctrl.articles = [];
        ctrl.sortOption = "Top";
        var elem = document.getElementById('spinner');

        ctrl.getSources = function(category){
            angular.element(elem).removeClass('hidden');
            ctrl.sources = [];   
            angular.element(document).find('articles-cards').addClass('hidden');
            angular.element(document).find('sources-cards').removeClass('hidden');
            var promise = GetNewsService.getSources(category);
            promise.then(function(response){
            angular.element(elem).addClass('hidden');
            ctrl.sources = response;
        })
        .catch(function(error){
			console.log("Something went wrong...", error);
		});
        };
        
        ctrl.getArticles = function(index){
            angular.element(elem).removeClass('hidden');
            ctrl.articles = [];
            angular.element(document).find('articles-cards').removeClass('hidden');
            angular.element(document).find('sources-cards').addClass('hidden');
            var sourceID = ctrl.sources[index].id;
            var sortBy = ctrl.sortOption.toLowerCase();
            var sourceSortBys = ctrl.sources[index].sortBys;
            for(var i=0; i<sourceSortBys.length; i++){
                if(sourceSortBys[i] === ctrl.sortOption){
                    sortBy = "&sortBy=" + ctrl.sortOption;
                }
                else{
                    sortBy = "";
                }
            }
            var promise = GetNewsService.getNewsArticles(sourceID, sortBy);
            promise.then(function(response){
            angular.element(elem).addClass('hidden');
            ctrl.articles = response;
        })
        .catch(function(error){
			console.log("Something went wrong...", error);
		});
        };

        $("#scrollTopBtn").click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
    }

    GetNewsService.$inject = ['$http', 'ArticlesAPIBasePath', 'SourcesAPIBasePath'];
    function GetNewsService($http, ArticlesAPIBasePath, SourcesAPIBasePath){
        var service = this;
        
        service.getSources = function (category) {
        return $http({
            restrict: "E",
            method: "GET",
            url: (SourcesAPIBasePath + category + "&apiKey=223c17aba59142e7b0b9248d64cdece7")
        })
        .then(function (result) {
            var dataArray = [];
            dataArray = result.data.sources;
            var results = [];
            angular.forEach(dataArray, function(v,k)  {
                results.push({id: v.id, name: v.name, text: v.description, url: v.url, sortBys: v.sortBysAvailable});
            });
            return results;
        })
        .catch(function(error){
            console.log("Something went wrong...");
        
        });
        };
        
        service.getNewsArticles = function (source, sortOption) {
        return $http({
            restrict: "E",
            method: "GET",
            url: (ArticlesAPIBasePath + source + sortOption + "&apiKey=223c17aba59142e7b0b9248d64cdece7")
        })
        .then(function (result) {
            var dataArray = [];
            dataArray = result.data.articles;
            var results = [];
            angular.forEach(dataArray, function(v,k)  {
                results.push({title: v.title, text: v.description, url: v.url, imageUrl: v.urlToImage, author: v.author});
            });
            return results;
        })
        .catch(function(error){
            console.log("Something went wrong...");
        
        });
        };
    }
    
    function SourcesCardsDirective () {
        return {
        restrict: "E",
        templateUrl: "sourcesCards.html",
        scope: {
        sources: "<",
        getArticles: '&'
        }
      };
    }
    
    function ArticlesCardsDirective () {
      return {
        restrict: "E",
        templateUrl: "articlesCards.html",
        scope: {
        articles: "<"
        }
      };
    }
    
})();