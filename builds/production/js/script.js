!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(){var mainApp=angular.module("mainApp",["ngRoute","ngAnimate"]);mainApp.config(function($locationProvider,$routeProvider){$locationProvider.html5Mode(!0),$routeProvider.when("/",{templateUrl:"/pages/home.html",controller:"mainController"}).when("/about",{templateUrl:"/pages/about.html",controller:"aboutController"}).when("/contact",{templateUrl:"/pages/contact.html",controller:"contactController"}).otherwise({redirectTo:"/home"})}),mainApp.controller("mainController",["$scope",function($scope){$scope.message="Everyone come and see how good I look!",$scope.pageClass="page-home"}]),mainApp.controller("aboutController",["$scope",function($scope){$scope.message="Look! I am an about page.",$scope.pageClass="page-about"}]),mainApp.controller("contactController",["$scope",function($scope){$scope.message="Contact us! JK. This is just a demo.",$scope.pageClass="page-contact"}])},{}]},{},[1]);